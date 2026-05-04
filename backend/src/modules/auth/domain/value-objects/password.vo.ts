import { InvalidPasswordException } from '../exceptions/weak-password.exception';

export class Password {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.length < 10) {
      throw new InvalidPasswordException('Password hash is invalid');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
