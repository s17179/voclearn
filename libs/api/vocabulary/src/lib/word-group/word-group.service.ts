import { Injectable, Logger } from '@nestjs/common';
import { CreateWordGroupRequest } from './dto/create-word-group.request';
import { UpdateWordGroupRequest } from './dto/update-word-group.request';
import { WordGroupEntity } from './word-group.entity';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { WordGroupRepository } from './word-group.repository';
import { WordGroup } from './dto/word-group';
import { WordGroupMapper } from './word-group.mapper';

@Injectable()
export class WordGroupService {
  private readonly logger = new Logger(WordGroupService.name);

  constructor(
    private readonly wordGroupRepository: WordGroupRepository,
    private readonly wordGroupMapper: WordGroupMapper
  ) {}

  async get(id: Uuid, userId: UserId): Promise<WordGroup> {
    const wordGroupEntity = await this.findOne(id, userId);

    const wordGroup = this.wordGroupMapper.map(wordGroupEntity);

    this.logger.debug(`Word group ${wordGroup.id} got by user ${userId}`);

    return wordGroup;
  }

  async list(userId: UserId): Promise<WordGroup[]> {
    const wordGroupEntities = await this.wordGroupRepository.find({
      where: { userId },
    });

    const wordGroups = this.wordGroupMapper.mapMany(wordGroupEntities);

    this.logger.debug(`Word groups listed by user ${userId}`);

    return wordGroups;
  }

  async create(dto: CreateWordGroupRequest, userId: UserId): Promise<void> {
    const wordGroup = new WordGroupEntity(dto.id, dto.name, [], userId);

    await this.wordGroupRepository.save(wordGroup);

    this.logger.debug(`Word group ${dto.id} created by user ${userId}`);
  }

  async update(
    id: Uuid,
    dto: UpdateWordGroupRequest,
    userId: UserId
  ): Promise<void> {
    const wordGroup = await this.findOne(id, userId);

    if (dto.name !== undefined) {
      wordGroup.name = dto.name;
    }

    await this.wordGroupRepository.save(wordGroup);

    this.logger.debug(`Word group ${id.value} updated by user ${userId}`);
  }

  async remove(id: Uuid, userId: UserId): Promise<void> {
    const wordGroup = await this.findOne(id, userId);

    const numberOfWordsInWordGroup = await this.wordGroupRepository.countWords(
      wordGroup.id
    );

    if (numberOfWordsInWordGroup > 0) {
      throw new Error('Word group must be empty to be removed');
    }

    await this.wordGroupRepository.remove(wordGroup);

    this.logger.debug(`Word group ${id.value} removed by user ${userId}`);
  }

  private async findOne(id: Uuid, userId: UserId): Promise<WordGroupEntity> {
    const wordGroup = await this.wordGroupRepository.findOneOrFail(id.value);

    WordGroupService.assertUserIsAuthorized(wordGroup, userId);

    return wordGroup;
  }

  private static assertUserIsAuthorized(
    wordGroup: WordGroupEntity,
    userId: UserId
  ): void {
    if (wordGroup.userId !== userId) {
      throw new Error(
        `User ${userId} does not have access to word group ${wordGroup.id}`
      );
    }
  }
}
