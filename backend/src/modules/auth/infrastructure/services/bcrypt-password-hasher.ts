import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import type { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly SALT_ROUNDS = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
