import { InvalidEmailException } from '../exceptions/invalid-email.exception';

export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new InvalidEmailException('Invalid email format');
    }
    this.value = value;
  }

  // ===== GETTERS =====

  public getValue(): string {
    return this.value;
  }

  // ===== PRIVATE METHODS =====
  private validate(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
