import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterRequestContract } from '@voclearn/contracts';

export class RegisterRequest implements RegisterRequestContract {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;
}
