import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly role: string,
  ) {}

  static fromEntity(user: UserEntity): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.getEmail().getValue(),
      user.getFullName(),
      user.getRole(),
    );
  }
}
