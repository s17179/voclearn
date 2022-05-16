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
import { WordGroupService } from './word-group.service';
import { CreateWordGroupRequest } from './dto/create-word-group.request';
import { UpdateWordGroupRequest } from './dto/update-word-group.request';
import { Uuid } from '@voclearn/api/shared/domain';
import { WordGroup } from './dto/word-group';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/auth';

@Controller('word-group')
export class WordGroupController {
  constructor(private readonly wordGroupService: WordGroupService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  list(@AuthUser() user: AuthenticatedUser): Promise<WordGroup[]> {
    return this.wordGroupService.list(user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() requestBody: CreateWordGroupRequest,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordGroupService.create(requestBody, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() requestBody: UpdateWordGroupRequest,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordGroupService.update(new Uuid(id), requestBody, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordGroupService.remove(new Uuid(id), user.id);
  }
}
