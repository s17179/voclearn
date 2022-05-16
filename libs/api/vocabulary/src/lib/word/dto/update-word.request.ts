import { PartialType } from '@nestjs/mapped-types';
import { CreateWordRequest } from './create-word.request';
import { UpdateWordRequestContract } from '@voclearn/contracts';

export class UpdateWordRequest
  extends PartialType(CreateWordRequest)
  implements UpdateWordRequestContract {}
