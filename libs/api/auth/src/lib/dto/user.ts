import { Email } from './email';
import { FullName } from './full-name';

export class User {
  constructor(public readonly email: Email, public readonly name: FullName) {}
}
