const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Priority List',
    description: 'Aplicação desenvolvida tendo como proposito otimizar a organização e produtividade das pessoas. Forma visual, a pessoa poderá organizar sua lista de tarefas, classificando a tarefa por nível de prioridade, status e data.',
    contact: {
      email: 'gonzagadaviddev@gmail.com',
    },
    license: 'MIT',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://todo-priority-list.herokuapp.com',
      description: 'Production API',
    },
  ],
  paths: {
    '/user': {
      post: {
        summary: 'Cadastro de pessoa usuária',
        description: 'Rota responsável para a pessoa usuária se inscrever no aplicativo',
        tags: ['User'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              examples: {
                user: {
                  value: {
                    name: 'User',
                    lastname: 'Test',
                    password: '123456',
                    email: 'user@server.com',
                  },
                },
              },
            },
          },
        },
        responses: {
          409: {
            description: 'Email already registered',
          },
          400: {
            description: 'Invalid entries. Try again.',
          },
          201: {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/UserInfo',
                },
              },
            },
          },
        },
      },
    },
    '/user/login': {
      post: {
        summary: 'Login da pessoa usuária',
        description: 'Rota responsável por verificar o registro da pessoa usuária e retornar um token junto com outras informações',
        tags: ['User'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
              examples: {
                user: {
                  value: {
                    email: 'user@server.com',
                    password: '123456',
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: 'Invalid entries. Try again.',
          },
          404: {
            description: 'User not found',
          },
          401: {
            description: 'Incorrect password',
          },
          202: {
            description: 'ACCEPTED',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/UserInfo',
                },
              },
            },
          },
        },
      },
    },
    '/task': {
      post: {
        summary: 'Registra uma tarefa',
        description: 'Rota responsável para o registro de um tarefa no banco de dados',
        tags: ['Task'],
        security: [{ JWT: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Task',
              },
              examples: {
                task: {
                  value: {
                    title: 'Tarefa 3',
                    description: 'Descrição da tarefa 3',
                    priority: '2',
                    status: 'inProcess',
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: 'Invalid entries. Try again.',
          },
          401: {
            description: 'jwt malformed / missing auth token',
          },
          201: {
            description: 'Task created successfully',

          },
        },
      },
      get: {
        summary: 'Retorna as tarefas',
        description: 'Rota responsável por retornar as informações basicas de todas as tarefas da pessoa usuária',
        tags: ['Task'],
        security: [{ JWT: [] }],
        responses: {
          401: {
            description: 'jwt malformed / missing auth token',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  $ref: '#/components/schemas/TaskInfo',
                },
              },
            },
          },
        },
      },
    },
    '/task/{id}': {
      get: {
        summary: 'Retorna a tarefa pelo id',
        description: 'Rota responsável por retornar a tarefa completa de acordo com id',
        tags: ['Task'],
        security: [{ JWT: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id da tarefa a ser requisitada',
            requiired: true,
          },
        ],
        responses: {
          401: {
            description: 'jwt malformed / missing auth token',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/TaskDetails',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Atualiza a tarefa pelo id',
        description: 'Rota responsável por atualizar a tarefa  de acordo com id',
        tags: ['Task'],
        security: [{ JWT: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id da tarefa a ser requisitada',
            requiired: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Task',
              },
              examples: {
                task: {
                  value: {
                    title: 'Tarefa 3',
                    description: 'Descrição da tarefa 3',
                    priority: '2',
                    status: 'inProcess',
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: 'Invalid entries. Try again.',
          },
          401: {
            description: 'jwt malformed / missing auth token',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/TaskDetails',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Deleta a tarefa pelo id',
        description: 'Rota responsável por deletar a tarefa  de acordo com id',
        tags: ['Task'],
        security: [{ JWT: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id da tarefa a ser requisitada',
            requiired: true,
          },
        ],
        responses: {
          401: {
            description: 'jwt malformed / missing auth token',
          },
          202: {
            description: 'Task removed successfully',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
      UserInfo: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          token: {
            type: 'string',
          },
          _id: {
            type: 'string',
          },
        },
      },
      Task: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          priority: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
      },
      TaskInfo: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          priority: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          created: {
            type: 'string',
          },
        },
      },
      TaskDetails: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          userId: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          priority: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          created: {
            type: 'string',
          },
          updated: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
    },
  },
};

export default swaggerDocs;
