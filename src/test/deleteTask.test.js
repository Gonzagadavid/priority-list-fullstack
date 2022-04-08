import { MongoClient } from 'mongodb';
import {
  describe, jest, beforeAll, afterAll, expect, it,
} from '@jest/globals';
import request from 'supertest';
import MongoClientMock from './helpers/MongoClientMock';
import app from '../api/app';

describe('Get /task/:id', () => {
  let authorization = null;
  let connectionMock = null;
  let taskId = null;
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
        title: 'Tarefa teste',
        description: 'Descrição da tarefa teste',
        priority: '2',
        status: 'inProcess',
      });

    const { _id } = await tasks.findOne({ title: 'Tarefa teste' });
    taskId = _id.toString();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('verifica a resposta ao tentar deletar uma task sem o token', async () => {
    const req = request(app);
    const response = await req.delete(`/task/${taskId}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('missing auth token');
  });

  it('verifica a resposta ao tentar deletar uma task com sucesso', async () => {
    const req = request(app);
    const response = await req
      .delete(`/task/${taskId}`)
      .set({ authorization });

    expect(response.statusCode).toBe(202);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Task removed successfully');
  });
});
