import { Injectable, Logger } from '@nestjs/common';
import { CreateWordRequest } from './dto/create-word.request';
import { UpdateWordRequest } from './dto/update-word.request';
import { WordEntity } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordGroupService } from '../word-group/word-group.service';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { AssociationEntity } from '../association/association.entity';
import { RepetitionClient } from '../repetition/repetition.client';
import { Word } from './dto/word';
import { WordMapper } from './word.mapper';
import { WordGroupMapper } from '../word-group/word-group.mapper';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);

  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
    private readonly wordGroupService: WordGroupService,
    private readonly repetitionClient: RepetitionClient,
    private readonly wordMapper: WordMapper,
    private readonly wordGroupMapper: WordGroupMapper
  ) {}

  async get(id: Uuid, userId: UserId): Promise<Word> {
    const wordEntity = await this.findOne(id, userId);

    const word = this.wordMapper.map(wordEntity);

    this.logger.debug(`Word ${word.id} got by user ${userId}`);

    return word;
  }

  async list(userId: UserId): Promise<Word[]> {
    const wordEntities = await this.wordRepository.find({
      where: { userId },
      relations: ['association', 'wordGroup'],
    });

    const words = this.wordMapper.mapMany(wordEntities);

    this.logger.debug(`Words listed by user ${userId}`);

    return words;
  }

  async create(dto: CreateWordRequest, userId: UserId): Promise<void> {
    const wordGroup = await this.wordGroupService.get(
      new Uuid(dto.wordGroupId),
      userId
    );
    const wordGroupEntity = this.wordGroupMapper.mapToEntity(wordGroup, userId);

    const word = new WordEntity(
      dto.id,
      dto.value,
      dto.translation,
      wordGroupEntity,
      userId
    );

    const association = new AssociationEntity(
      dto.associationId,
      dto.associationNote,
      word
    );

    word.association = association;

    await this.wordRepository.manager.transaction(async (entityManager) => {
      await entityManager.save(association);
      await entityManager.save(word);

      await this.repetitionClient.addWord(new Uuid(word.id), userId);
    });

    this.logger.debug(`Word ${dto.id} created by user ${userId}`);
  }

  async update(
    id: Uuid,
    dto: UpdateWordRequest,
    userId: UserId
  ): Promise<void> {
    const word = await this.findOne(id, userId);

    if (dto.value !== undefined) {
      word.value = dto.value;
    }
    if (dto.translation !== undefined) {
      word.translation = dto.translation;
    }
    if (dto.wordGroupId !== undefined) {
      const wordGroup = await this.wordGroupService.get(
        new Uuid(dto.wordGroupId),
        userId
      );

      word.wordGroup = this.wordGroupMapper.mapToEntity(wordGroup, userId);
    }
    if (dto.associationNote !== undefined) {
      word.association.note = dto.associationNote;
    }

    await this.wordRepository.manager.transaction(async (entityManager) => {
      await entityManager.save(word);
      await entityManager.save(word.association);
    });

    this.logger.debug(`Word ${id.value} updated by user ${userId}`);
  }

  async remove(id: Uuid, userId: UserId): Promise<void> {
    const word = await this.findOne(id, userId);

    await this.wordRepository.manager.transaction(async (entityManager) => {
      await entityManager.remove(word);
      await entityManager.remove(word.association);

      await this.repetitionClient.removeWord(id, userId);
    });

    this.logger.debug(`Word ${id.value} removed by user ${userId}`);
  }

  private async findOne(id: Uuid, userId: UserId): Promise<WordEntity> {
    const word = await this.wordRepository.findOneOrFail(id.value, {
      relations: ['association', 'wordGroup'],
    });

    WordService.assertUserIsAuthorized(word, userId);

    return word;
  }

  private static assertUserIsAuthorized(
    word: WordEntity,
    userId: UserId
  ): void {
    if (word.userId !== userId) {
      throw new Error(`User ${userId} does not have access to word ${word.id}`);
    }
  }
}
