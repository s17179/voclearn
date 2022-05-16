import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreateWordRequestContract } from '@voclearn/contracts';

export class CreateWordRequest implements CreateWordRequestContract {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  value!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  translation!: string;

  @IsNotEmpty()
  @IsUUID()
  wordGroupId!: string;

  @IsNotEmpty()
  @IsUUID()
  associationId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  associationNote!: string;
}
