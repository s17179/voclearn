import { ensure, isDefined } from 'tiny-types';
import { Request, Response } from 'express';

export const idTokenCookieKey = 'idToken';
export const refreshTokenCookieKey = 'refreshToken';
export const isAuthenticatedCookieKey = 'isAuthenticated';

export interface AuthCookies {
  [idTokenCookieKey]: string;
  [refreshTokenCookieKey]: string;
  [isAuthenticatedCookieKey]: string;
}

export const assertAllAuthCookiesAreDefinedInRequest = (
  request: Request,
  context: string
): void => {
  const cookies = request.cookies;

  const idTokenCookie = cookies[idTokenCookieKey];
  const refreshTokenCookie = cookies[refreshTokenCookieKey];
  const isAuthenticatedCookie = cookies[isAuthenticatedCookieKey];

  try {
    ensure(context, isAuthenticatedCookie, isDefined());
    ensure(context, idTokenCookie, isDefined());
    ensure(context, refreshTokenCookie, isDefined());
  } catch (e) {
    throw new Error('Valid auth cookies not provided');
  }
};

export const attachAuthCookiesToResponse = (
  cookies: AuthCookies,
  response: Response
): void => {
  response.cookie(idTokenCookieKey, cookies[idTokenCookieKey], {
    httpOnly: true,
  });

  response.cookie(refreshTokenCookieKey, cookies[refreshTokenCookieKey], {
    httpOnly: true,
  });

  response.cookie(isAuthenticatedCookieKey, cookies[isAuthenticatedCookieKey]);
};

export const overwriteAuthCookiesInRequest = (
  cookies: AuthCookies,
  request: Request
): void => {
  request.cookies[idTokenCookieKey] = cookies[idTokenCookieKey];
  request.cookies[refreshTokenCookieKey] = cookies[refreshTokenCookieKey];
  request.cookies[isAuthenticatedCookieKey] = cookies[isAuthenticatedCookieKey];
};
