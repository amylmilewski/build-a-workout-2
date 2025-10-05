// Testing the password matching logic (exercising the 'bcrypt.compare' step)

const bcrypt = require('bcrypt');
const User = require('../models/userModel');

jest.mock('bcrypt');

describe('User model login method', () => {
  let fakeUser;

  beforeEach(() => {
    fakeUser = { email: 'test@example.com', password: 'hashed-password' };
  });

  it('should throw an error if email is missing', async () => {
    await expect(User.login('', 'password')).rejects.toThrow('All fields must be filled');
  });

  it('should throw an error if password is missing', async () => {
    await expect(User.login('test@example.com', '')).rejects.toThrow('All fields must be filled');
  });

  it('should throw an error if user is not found', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    await expect(User.login('notfound@example.com', 'password'))
      .rejects.toThrow('Incorrect email');
  });

  it('should throw an error if password does not match', async () => {
    User.findOne = jest.fn().mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(User.login(fakeUser.email, 'wrongpassword'))
      .rejects.toThrow('Incorrect password');
  });

  it('should return user if email and password match', async () => {
    User.findOne = jest.fn().mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);

    const user = await User.login(fakeUser.email, 'correctpassword');
    expect(user).toEqual(fakeUser);
  });
});
