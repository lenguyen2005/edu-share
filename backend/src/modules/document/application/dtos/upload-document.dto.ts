import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { DocumentStatus } from '../../domain/enum/document-status.enum';

export class UploadDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;

  @IsString()
  @IsNotEmpty()
  fileKey: string;
}
