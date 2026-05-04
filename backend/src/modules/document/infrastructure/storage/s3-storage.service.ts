import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IStorageService } from '../../domain/interfaces/storage.service.interface';

@Injectable()
export class S3StorageService implements IStorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME || '';

    this.s3Client = new S3Client({
      region: process.env.S3_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
      endpoint: process.env.S3_ENDPOINT || undefined,
      forcePathStyle: true,
    });
  }

  async upload(file: Express.Multer.File, key: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);
      return key;
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new InternalServerErrorException(
        'Lỗi khi tải tập tin lên bộ lưu trữ',
      );
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: parseInt(process.env.S3_SIGNED_URL_EXPIRES || '900'),
      });

      return url;
    } catch (error) {
      console.error('S3 Signed URL Error:', error);
      throw new InternalServerErrorException(
        'không thể tạo liên kết tải tập tin',
      );
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      await this.s3Client.send(command);
    } catch (error) {
      console.error('S3 Delete Error:', error);
    }
  }
}
