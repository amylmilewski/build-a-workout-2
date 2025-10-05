const { signupUser, loginUser } = require('../controllers/userController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../models/userModel');
jest.mock('jsonwebtoken');

process.env.SECRET = "test-secret";

// 'describe' groups related test cases into a test suite
// Signup controller test
describe('signupUser controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: 'StrongPass123!' } };

    res = {
      status: jest.fn().mockReturnThis(), // allows chaining
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // 'it' defines an individual test case
  // Happy path
  it('should create a new user and return email + token on success', async () => {
    const fakeUser = { _id: '12345', email: req.body.email };
    User.signup.mockResolvedValue(fakeUser);
    jwt.sign.mockReturnValue('fake-jwt-token');

    await signupUser(req, res);

    expect(User.signup).toHaveBeenCalledWith(req.body.email, req.body.password);
    expect(jwt.sign).toHaveBeenCalledWith({ _id: fakeUser._id }, expect.any(String), { expiresIn: '3d' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ email: req.body.email, token: 'fake-jwt-token' });
  });

  // Error path
  it('should return 400 if signup throws an error', async () => {
    User.signup.mockRejectedValue(new Error('Email already in use'));

    await signupUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email already in use' });
  });
});

// Login controller test
describe('loginUser controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: 'StrongPass123!' } };

    res = {
      status: jest.fn().mockReturnThis(), // allows chaining
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // 'it' defines an individual test case
  // Happy path
  it('should log in an existing user and return email + token on success', async () => {
    const fakeUser = { _id: '12345', email: req.body.email };
    User.login.mockResolvedValue(fakeUser); // mock to resolve to a fake user
    jwt.sign.mockReturnValue('fake-jwt-token'); // mock to return a fake token

    await loginUser(req, res);

    expect(User.login).toHaveBeenCalledWith(req.body.email, req.body.password); // check that User.login was called with the right args
    expect(jwt.sign).toHaveBeenCalledWith({ _id: fakeUser._id }, expect.any(String), { expiresIn: '3d' }); // check that JWT creation was done with the user's _id
    expect(res.status).toHaveBeenCalledWith(200); // check that the controller responds with 200 status
    expect(res.json).toHaveBeenCalledWith({ email: req.body.email, token: 'fake-jwt-token' });
  }); // check that the controller responds with the correct user information

  // Error path
  it('should return 400 if login throws an incorrect email error', async () => {
    User.login.mockRejectedValue(new Error('Incorrect email'));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400); // check that the controller responds with 400 status
    expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect email' }); // check that the controller responds with the error
  });

  it('should return 400 if login throws an incorrect password error', async () => {
    User.login.mockRejectedValue(new Error('Incorrect password'));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect password' });
  });

});
