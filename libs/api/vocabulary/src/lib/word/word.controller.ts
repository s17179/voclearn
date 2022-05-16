import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordRequest } from './dto/create-word.request';
import { UpdateWordRequest } from './dto/update-word.request';
import { Uuid } from '@voclearn/api/shared/domain';
import { Word } from './dto/word';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/auth';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  list(@AuthUser() user: AuthenticatedUser): Promise<Word[]> {
    return this.wordService.list(user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() requestBody: CreateWordRequest,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordService.create(requestBody, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() requestBody: UpdateWordRequest,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordService.update(new Uuid(id), requestBody, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordService.remove(new Uuid(id), user.id);
  }
}
