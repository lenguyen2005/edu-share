import { Injectable, Inject } from '@nestjs/common';
import { IStorageService } from '../../domain/interfaces/storage.service.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenerateUploadUrlUseCase {
  constructor(
    @Inject('IStorageService')
    private readonly storageService: IStorageService,
  ) {}

  async execute(fileName: string, contentType: string) {
    const fileKey = `docs/${uuidv4()}-${fileName.replace(/\s+/g, '-')}`;

    const uploadUrl = await this.storageService.getPresignedUploadUrl(
      fileKey,
      contentType,
    );

    return {
      fileKey,
      uploadUrl,
    };
  }
}
