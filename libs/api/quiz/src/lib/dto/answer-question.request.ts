import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AnswerQuestionRequestContract } from '@voclearn/contracts';

export class AnswerQuestionRequest implements AnswerQuestionRequestContract {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  answer!: string;
}
