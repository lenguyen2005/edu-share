import { InvalidTitleException } from '../exceptions/invalid-title.exception';

export class Title {
  private readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: string) {
    if (!value || value.trim().length < 5) {
      throw new InvalidTitleException();
    }
  }

  getValue() {
    return this.value;
  }
}
