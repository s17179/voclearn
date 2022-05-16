export interface DecodedJwtToken {
  sub: string;
  exp: Date;
}

export abstract class JwtTokenDecoder {
  abstract decode(token: string): DecodedJwtToken;
}
