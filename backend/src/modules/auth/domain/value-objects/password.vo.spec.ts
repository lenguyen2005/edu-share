import { Password } from './password.vo';
import { InvalidPasswordException } from '../exceptions/weak-password.exception';

describe('Password VO', () => {
  it('should create a valid password', () => {
    const password = new Password('hashedpassword123');

    expect(password.getValue()).toBe('hashedpassword123');
  });

  it('should throw if password is empty', () => {
    expect(() => new Password('')).toThrow(InvalidPasswordException);
  });

  it('should throw if password is too short', () => {
    expect(() => new Password('short')).toThrow(InvalidPasswordException);
  });

  it('should accept very long password', () => {
    const longPassword = 'a'.repeat(100);

    const password = new Password(longPassword);

    expect(password.getValue()).toBe(longPassword);
  });
});
