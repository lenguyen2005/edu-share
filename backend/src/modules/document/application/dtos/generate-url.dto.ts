import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';

const ALLOWED_MIME_TYPES = [
  'application/pdf', // .pdf
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-powerpoint', // .ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'image/jpeg', // .jpg, .jpeg
  'image/png', // .png
];

export class GenerateUrlDto {
  @IsString({ message: 'Tên tập tin phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên tập tin không được để trống' })
  @MaxLength(255, { message: 'Tên tập tin không được vượt quá 255 ký tự' })
  @Matches(/^[a-zA-Z0-9_.\-\s]+$/, {
    message: 'Tên tập tin chứa ký tự không hợp lệ',
  })
  fileName: string;

  @IsString({ message: 'Định dạng tập tin phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Định dạng tập tin không được để trống' })
  @IsIn(ALLOWED_MIME_TYPES, {
    message: 'Định dạng tập tin không được hỗ trợ trên hệ thống',
  })
  contentType: string;
}
