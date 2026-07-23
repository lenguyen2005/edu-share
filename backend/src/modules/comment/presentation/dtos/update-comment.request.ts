import { IsString, Length } from 'class-validator';

export class UpdateCommentRequest {
  @IsString()
  @Length(3, 1000)
  content: string;
}
