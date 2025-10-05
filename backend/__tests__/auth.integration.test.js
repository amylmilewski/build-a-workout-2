const request = require('supertest');
const app = require('../app'); // Express app
const mongoose = require('mongoose');
const User = require('../models/userModel');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.SECRET = 'test-secret';

describe('Auth integration tests', () => {
  let mongoServer;
  const testEmail = `testuser${Date.now()}@example.com`; // unique email each run
  const testPassword = 'StrongPass123!';
  const wrongPassword = 'WrongPass456!';

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should sign up a new user successfully', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testEmail);
    expect(res.body).toHaveProperty('token');
  });

  it('should not allow signup with existing email', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email already in use');
  });

  it('should log in an existing user successfully', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testEmail);
    expect(res.body).toHaveProperty('token');
  });

  it('should not log in with incorrect password', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({ email: testEmail, password: wrongPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Incorrect password');
  });

  it('should not log in with non-existent email', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({ email: `fake${Date.now()}@example.com`, password: testPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Incorrect email');
  });
});
