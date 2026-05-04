import { Injectable } from '@nestjs/common';
import { IStorageService } from '../../domain/interfaces/storage.service.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly uploadRoot = path.resolve('./uploads');

  constructor() {
    if (!fs.existsSync(this.uploadRoot)) {
      fs.mkdirSync(this.uploadRoot, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File, key: string): Promise<string> {
    const fullPath = path.join(this.uploadRoot, key);

    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await fs.promises.writeFile(fullPath, file.buffer);

    return key;
  }

  async getSignedUrl(fileKey: string): Promise<string> {
    return Promise.resolve(`http://localhost:3000/static/${fileKey}`);
  }

  async delete(fileKey: string): Promise<void> {
    const fullPath = path.join(this.uploadRoot, fileKey);

    try {
      await fs.promises.unlink(fullPath);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }
}
