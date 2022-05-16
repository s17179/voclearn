import { PartialType } from '@nestjs/mapped-types';
import { CreateWordGroupRequest } from './create-word-group.request';
import { UpdateWordGroupRequestContract } from '@voclearn/contracts';

export class UpdateWordGroupRequest
  extends PartialType(CreateWordGroupRequest)
  implements UpdateWordGroupRequestContract {}
