import { Email } from './email.vo';

describe('Email VO', () => {
  it('should create a valid email', () => {
    const email = new Email('test@gmail.com');
    expect(email.getValue()).toBe('test@gmail.com');
  });

  it('should throw error for invalid email (no @)', () => {
    expect(() => new Email('testgmail.com')).toThrow('Invalid email');
  });

  it('should throw error for invalid email (no domain)', () => {
    expect(() => new Email('test@')).toThrow('Invalid email');
  });
});
