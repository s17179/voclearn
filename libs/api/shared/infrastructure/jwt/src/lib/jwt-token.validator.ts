export abstract class JwtTokenValidator {
  abstract assertValid(token: string): Promise<void>;
}
