import { HttpStatus } from '@nestjs/common';

export abstract class DomainException extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
