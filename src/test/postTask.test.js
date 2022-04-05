import { MongoClient } from 'mongodb';
import {
  describe, expect, it, jest, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import MongoClientMock from './helpers/MongoClientMock';
import app from '../api/app';

describe('Post /task', () => {
  let authorization = null;
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
    const { body } = await req
      .post('/user/login')
      .send({
        email: 'usuario1@email.com',
        password: '123456',
      });
    authorization = body.token;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('verifica a resposta ao postar uma task faltando title', async () => {
    const req = request(app);
    const response = await req
      .post('/task')
      .set({ authorization })
      .send({
        description: 'Descrição da tarefa 3',
        priority: '2',
        status: 'inProcess',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta ao postar uma task faltando description', async () => {
    const req = request(app);
    const response = await req
      .post('/task')
      .set({ authorization })
      .send({
        title: 'Tarefa 3',
        priority: '2',
        status: 'inProcess',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta ao postar uma task faltando priority', async () => {
    const req = request(app);
    const response = await req
      .post('/task')
      .set({ authorization })
      .send({
        title: 'Tarefa 3',
        description: 'Descrição da tarefa 3',
        status: 'inProcess',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta ao postar uma task faltando status', async () => {
    const req = request(app);
    const response = await req
      .post('/task')
      .set({ authorization })
      .send({
        title: 'Tarefa 3',
        description: 'Descrição da tarefa 3',
        priority: '2',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta ao postar uma task sem token', async () => {
    const req = request(app);
    const response = await req
      .post('/task')
      .send({
        title: 'Tarefa 3',
        description: 'Descrição da tarefa 3',
        priority: '2',
        status: 'inProcess',
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('missing auth token');
  });

  it('verifica a resposta quando uma task é postada com sucesso', async () => {
    const req = request(app);
    const response = await req
      .post('/task')
      .set({ authorization })
      .send({
        title: 'Tarefa 3',
        description: 'Descrição da tarefa 3',
        priority: '2',
        status: 'inProcess',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Task created successfully');
  });
});
