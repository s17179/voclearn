import { User } from './dto/user';
import { Email } from './dto/email';
import { FullName } from './dto/full-name';
import { Password } from './dto/password';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthTokens } from './dto/auth-tokens';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async register(
    email: Email,
    fullName: FullName,
    password: Password
  ): Promise<void> {
    await this.userRepository.add(new User(email, fullName), password);

    this.logger.debug(`User ${email.value} registered`);
  }

  async login(email: Email, password: Password): Promise<AuthTokens> {
    const authTokens = await this.userRepository.authenticate({
      email,
      password,
    });

    this.logger.debug(`User ${email.value} logged`);

    return authTokens;
  }
}
