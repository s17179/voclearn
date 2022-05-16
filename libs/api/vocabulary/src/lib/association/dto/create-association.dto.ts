import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateAssociationDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  note!: string;

  @IsNotEmpty()
  @IsUUID()
  wordId!: string;
}
