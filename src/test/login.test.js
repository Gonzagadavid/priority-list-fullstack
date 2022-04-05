import { MongoClient } from 'mongodb';
import {
  describe, expect, it, jest, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import MongoClientMock from './helpers/MongoClientMock';
import app from '../api/app';

describe('Post /user/login', () => {
  let connectionMock = null;
  beforeAll(async () => {
    connectionMock = await MongoClientMock();
    MongoClient.connect = jest.fn().mockResolvedValueOnce(connectionMock);

    const db = await connectionMock.db('TodoList');
    const users = await db.collection('users');
    await users.deleteMany({});

    const req = request(app);
    await req
      .post('/user')
      .send({
        name: 'usuario1',
        lastname: 'dos Testes',
        email: 'usuario1@email.com',
        password: '123456',
      });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('verifica a resposta com email inválido', async () => {
    const req = request(app);
    const response = await req
      .post('/user/login')
      .send({
        email: 'usuario1email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta ao enviar uma requisição sem email', async () => {
    const req = request(app);
    const response = await req
      .post('/user/login')
      .send({
        password: '123456',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta ao enviar uma requisição sem password', async () => {
    const req = await request(app);
    const response = await req
      .post('/user/login')
      .send({
        email: 'usuario1email.com',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica resposta status 404 com usuario não cadastrado', async () => {
    const req = request(app);
    const response = await req
      .post('/user/login')
      .send({
        email: 'semregistro@email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User not found');
  });

  it('verifica resposta status 201 com usuario válido', async () => {
    const req = request(app);
    const response = await req
      .post('/user/login')
      .send({
        email: 'usuario1@email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(202);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('lastname');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('usuario1');
    expect(response.body.lastname).toBe('dos Testes');
    expect(response.body.email).toBe('usuario1@email.com');
  });
});
