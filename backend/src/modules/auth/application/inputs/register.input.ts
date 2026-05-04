export class RegisterInput {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string,
    public readonly fullName: string,
  ) {}
}
