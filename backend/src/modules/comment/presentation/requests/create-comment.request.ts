import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentRequest {
  @IsString()
  @Length(3, 1000)
  content: string;

  @IsUUID()
  documentId: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
