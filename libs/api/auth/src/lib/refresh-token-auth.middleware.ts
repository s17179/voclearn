import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {
  JwtTokenDecoder,
  JwtTokenRefresher,
} from '@voclearn/api/shared/infrastructure/jwt';
import {
  assertAllAuthCookiesAreDefinedInRequest,
  attachAuthCookiesToResponse,
  AuthCookies,
  idTokenCookieKey,
  isAuthenticatedCookieKey,
  overwriteAuthCookiesInRequest,
  refreshTokenCookieKey,
} from './auth.cookies';

@Injectable()
export class RefreshTokenAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenDecoder: JwtTokenDecoder,
    private readonly tokenRefresher: JwtTokenRefresher
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

    const now = new Date();

    if (decodedIdToken.exp < now) {
      const refreshToken = request.cookies[refreshTokenCookieKey];

      const refreshedTokens = await this.tokenRefresher.refresh(refreshToken);

      const newAuthCookies: AuthCookies = {
        [idTokenCookieKey]: refreshedTokens.idToken,
        [refreshTokenCookieKey]: refreshedTokens.refreshToken,
        [isAuthenticatedCookieKey]: '1',
      };

      overwriteAuthCookiesInRequest(newAuthCookies, request);
      attachAuthCookiesToResponse(newAuthCookies, response);
    }

    next();
  }
}
