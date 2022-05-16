import {
  Injectable,
  UnauthorizedException,
  NestMiddleware,
} from '@nestjs/common';
import {
  DecodedJwtToken,
  JwtTokenDecoder,
  JwtTokenValidator,
} from '@voclearn/api/shared/infrastructure/jwt';
import { NextFunction, Request, Response } from 'express';
import {
  assertAllAuthCookiesAreDefinedInRequest,
  idTokenCookieKey,
} from './auth.cookies';
import { AuthenticatedUser } from './dto/authenticated-user';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenDecoder: JwtTokenDecoder,
    private readonly tokenValidator: JwtTokenValidator
  ) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      assertAllAuthCookiesAreDefinedInRequest(request, this.constructor.name);
    } catch (e) {
      throw new UnauthorizedException((<Error>e).message);
    }

    const idToken = request.cookies[idTokenCookieKey];

    const decodedIdToken = this.tokenDecoder.decode(idToken);

    await this.assertIdTokenIsValid(idToken);

    AuthMiddleware.addAuthenticatedUserToRequest(request, decodedIdToken);

    next();
  }

  private async assertIdTokenIsValid(idToken: string): Promise<void> {
    try {
      await this.tokenValidator.assertValid(idToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid token given');
    }
  }

  private static addAuthenticatedUserToRequest(
    request: Request,
    decodedIdToken: DecodedJwtToken
  ): void {
    const authenticatedUser: AuthenticatedUser = {
      id: decodedIdToken.sub,
    };

    Object.assign(request, { authenticatedUser });
  }
}
