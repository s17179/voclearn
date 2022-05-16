import { Token } from './token';

export interface AuthTokens {
  idToken: Token;
  refreshToken: string;
}
