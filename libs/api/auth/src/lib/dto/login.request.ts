import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginRequestContract } from '@voclearn/contracts';

export class LoginRequest implements LoginRequestContract {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
