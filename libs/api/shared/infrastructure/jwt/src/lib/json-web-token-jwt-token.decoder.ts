import { Injectable } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { DecodedJwtToken, JwtTokenDecoder } from './jwt-token.decoder';

@Injectable()
export class JsonWebTokenJwtTokenDecoder implements JwtTokenDecoder {
  decode(token: string): DecodedJwtToken {
    const decodedIdToken = decode(token);

    if (decodedIdToken === null || typeof decodedIdToken === 'string') {
      throw new Error('Decoding token failed');
    }

    if (decodedIdToken.sub === undefined) {
      throw new Error('Cannot decode jwt token due to lack of sub property');
    }

    if (decodedIdToken.exp === undefined) {
      throw new Error('Cannot decode jwt token due to lack of exp property');
    }

    return {
      sub: decodedIdToken.sub,
      exp: new Date(decodedIdToken.exp * 1000),
    };
  }
}
