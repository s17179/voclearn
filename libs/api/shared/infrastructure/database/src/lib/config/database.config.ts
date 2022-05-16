// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Config } from '@voclearn/api/shared/infrastructure/config';

export class DatabaseConfig implements Config {
  @IsNotEmpty()
  @IsString()
  readonly host: string = process.env.DATABASE_HOST;

  @IsNotEmpty()
  @IsNumber()
  readonly port: number = +process.env.DATABASE_PORT;

  @IsNotEmpty()
  @IsString()
  readonly user: string = process.env.DATABASE_USER;

  @IsNotEmpty()
  @IsString()
  readonly password: string = process.env.DATABASE_PASSWORD;

  @IsNotEmpty()
  @IsString()
  readonly name: string = process.env.DATABASE_NAME;
}
