import { Role } from '../../domain/enum/role.enum';

export class UserResponseDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: Role,
  ) {}
}
