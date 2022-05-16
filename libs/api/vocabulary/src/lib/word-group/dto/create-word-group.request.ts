import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreateWordGroupRequestContract } from '@voclearn/contracts';

export class CreateWordGroupRequest implements CreateWordGroupRequestContract {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;
}
