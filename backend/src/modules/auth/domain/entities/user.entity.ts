import { Password } from './../value-objects/password.vo';
import { Email } from './../value-objects/email.vo';
import { Role } from '../enum/role.enum';
import { InvalidUserDataException } from '../exceptions/invalid-user-data.exception';

export class UserEntity {
  constructor(
    public readonly id: string,
    private email: Email,
    private password: Password, // đã hash
    private fullName: string,
    private role: Role,
    private exp: number,
    private level: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    private refreshToken?: string | null, // đã hash
  ) {
    this.validate();
  }

  private validate() {
    if (!this.id) {
      throw new InvalidUserDataException('id');
    }

    if (!this.fullName || this.fullName.trim().length < 2) {
      throw new InvalidUserDataException('fullName');
    }

    if (this.exp < 0) {
      throw new InvalidUserDataException('exp');
    }

    if (this.level < 1) {
      throw new InvalidUserDataException('level');
    }
  }

  // ===== GETTERS =====
  public getEmail(): Email {
    return this.email;
  }

  public getPasswordHash(): string {
    return this.password.getValue();
  }

  public getFullName(): string {
    return this.fullName;
  }

  public getRole(): Role {
    return this.role;
  }

  public getExp(): number {
    return this.exp;
  }

  public getLevel(): number {
    return this.level;
  }

  public getRefreshToken() {
    return this.refreshToken;
  }

  // ===== BUSINESS METHODS =====
  public changeEmail(newEmail: Email) {
    this.email = newEmail;
  }

  public changePassword(newPassword: Password) {
    this.password = newPassword;
  }

  static createAdmin(id: string, email: Email, password: Password): UserEntity {
    return new UserEntity(
      id,
      email,
      password,
      'admin',
      Role.ADMIN,
      0,
      999,
      new Date(),
      new Date(),
      null,
    );
  }
}
