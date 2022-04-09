import { MongoClient } from 'mongodb';
import {
  describe, expect, it, jest, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import MongoClientMock from './helpers/MongoClientMock';
import app from '../api/app';

describe('Get /task', () => {
  let authorization = null;
  let connectionMock = null;
  beforeAll(async () => {
    connectionMock = await MongoClientMock();
    MongoClient.connect = jest.fn().mockResolvedValueOnce(connectionMock);

    const db = await connectionMock.db('TodoList');
    const users = await db.collection('users');
    const tasks = await db.collection('tasks');
    await users.deleteMany({});
    await tasks.deleteMany({});

    const req = request(app);
    await req
      .post('/user')
      .send({
        name: 'usuario1',
        lastname: 'dos Testes',
        email: 'usuario1@email.com',
        password: '123456',
      });
    const { body } = await req
      .post('/user/login')
      .send({
        email: 'usuario1@email.com',
        password: '123456',
      });
    authorization = body.token;

    await req
      .post('/task')
      .set({ authorization })
      .send({
        title: 'Tarefa 1',
        description: 'Descrição da tarefa 1',
        priority: '2',
        status: 'inProcess',
      });

    await req
      .post('/task')
      .set({ authorization })
      .send({
        title: 'Tarefa 2',
        description: 'Descrição da tarefa 2',
        priority: '2',
        status: 'inProcess',
      });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('verifica a resposta ao tentar buscar tasks sem o token', async () => {
    const req = request(app);
    const response = await req.get('/task');

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('missing auth token');
  });

  it('verifica a resposta ao tentar buscar tasks corretamente', async () => {
    const req = request(app);
    const response = await req
      .get('/task')
      .set({ authorization });

    response.body.forEach((task) => {
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('status');
      expect(task).toHaveProperty('priority');
      expect(task).toHaveProperty('created');
      expect(task).toHaveProperty('_id');
    });
  });
});
