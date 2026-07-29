import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { IStorageService } from '../../domain/interfaces/storage.service.interface';

@Injectable()
export class S3StorageService implements IStorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly signedUrlExpires: number;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.getRequired('S3_BUCKET_NAME');
    this.signedUrlExpires = Number(
      this.configService.get('S3_SIGNED_URL_EXPIRES') ?? 900,
    );

    const region = this.configService.get<string>('S3_REGION') ?? 'us-east-1';
    const endpoint = this.configService.get<string>('S3_ENDPOINT');

    // Ghi chú: Trên môi trường ECS Production, không nên truyền Access Key / Secret Key.
    // IAM Task Role đã được bọc ngoài ECS sẽ tự động cấp quyền cho S3Client.
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'S3_SECRET_ACCESS_KEY',
    );

    const clientConfig: S3ClientConfig = { region };

    if (endpoint) {
      clientConfig.endpoint = endpoint;
      clientConfig.forcePathStyle = true;
    }

    if (accessKeyId && secretAccessKey) {
      clientConfig.credentials = {
        accessKeyId,
        secretAccessKey,
      };
    }

    this.s3Client = new S3Client(clientConfig);
  }

  async getPresignedUploadUrl(
    key: string,
    contentType: string,
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: contentType,
      });

      return await getSignedUrl(this.s3Client, command, {
        expiresIn: this.signedUrlExpires,
      });
    } catch {
      throw new InternalServerErrorException('Không thể tạo liên kết tải lên');
    }
  }

  /**
   * Trả về URL để Frontend có thể đọc/hiển thị file (method GET).
   */
  async getSignedUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, {
        expiresIn: this.signedUrlExpires,
      });
    } catch {
      throw new InternalServerErrorException(
        'Không thể tạo liên kết tải tập tin',
      );
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch {
      throw new InternalServerErrorException('Không thể xóa tập tin');
    }
  }

  private getRequired(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  }
}
