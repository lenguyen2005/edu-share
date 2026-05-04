import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password không được để trống' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  fullName: string;
}
