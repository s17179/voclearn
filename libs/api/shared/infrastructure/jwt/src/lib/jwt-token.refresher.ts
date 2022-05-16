export interface RefreshedTokens {
  idToken: string;
  refreshToken: string;
}

export abstract class JwtTokenRefresher {
  abstract refresh(refreshToken: string): Promise<RefreshedTokens>;
}
