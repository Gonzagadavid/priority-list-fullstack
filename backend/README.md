# Lista de Prioridades - Backend

<h1><a href="https://todo-list-frontend-green.vercel.app/" >Visite a Aplicação</a></h1>

<h2><a href="https://github.com/Gonzagadavid/todo-list-frontend" >Repositório Lista de Prioridades - Frontend</a></h2>

---

# Sumário

- [Introdução](#introdução)
- [Backend](#backend)
- [Instruções](#instruções)
- [Arquitetura](#Arquitetura)
- [Rotas](#rotas)
  - [POST /user](post-/user)
  - [POST /user/login](post-/user/login)
  - [POST /task](post-/task)
  - [GET /task](get-/task)
  - [GET /task/:id](get-/task/:id)
  - [PUT /task/:id](put-/task/:id)
  - [DELETE /task/:id](delete-/task/:id)
- [Banco de Dados](#banco-de-dados)
- [Validação](#validação)
- [Tecnologias](#tecnologias)
- [Testes](#testes)
- [Deploy](#deploy)
- [Implementações Futuras](implementações-futuras)


# Intordução

O desenvolvimento da aplicação Lista de Prioridades teve como proposito otimizar a organização e produtividade das pessoas. Forma visual, a pessoa poderá organizar sua lista de tarefas, classificando a tarefa por nível de prioridade, status e data.


# Instruções

1 - abra o terminal

2- clone o repositório do Backend `git clone git@github.com:Gonzagadavid/todo-list-backend.git`

3- entre no diretório do repositorio clonado `cd todo-list-backend`

4- execute o comando para instalar as dependências `npm install`

5- preencha o arquivo `.env-eg` com os dados do seu banco de dados MongoDB local e mude o nome do arquivo para `.env`  
*caso não tenha o MongoDB instalado siga o seguinte [tutorial](https://docs.mongodb.com/manual/installation/)* 

6- execute o comando para iniciar o servidor `npm start`

7- abra um nova janela do terminal

8- clone o repositório do Frontend `git clone git@github.com:Gonzagadavid/todo-list-frontend.git`

9- entre no diretório do repositorio clonado `cd todo-list-frontend`

10- execute o comando para instalar as dependências `npm install`

11- execute o comando para iniciar a aplicação `npm start`

12- a aplicação iniciará em `http://localhost:3000`



# Arquitetura

Sequindo o formato da arquitetura em camadas MSC *(Model Service Controllers)*, a estruturação do código foi feito de forma tornar o código légivel e de fácil entendimento, visando o  reaproveitamento e não gerar problemas para a implementação de futuras melhorias, novas funcionalidades e escalabilidade.

![estruturação de pastas](./assets/estrutura.png)


# Rotas

## POST /user

A rota `POST /user` foi desenvolvida para o registro de novas pessoas usuárias da aplicação.

entrada:

```json
{
  "body": {
	  "name": "usuario1",
    "lastname": "dos Testes",
	  "email": "usuario1@email.com",
	  "password": "123456"
  }
}

```

saída *(status: 201)*:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3MjU1Nn0.iK8x5uDNJMVHEv6OX7KK_T1J5KASEQvbgqXZc3Q1I2M",
	"_id": "620dd0ac8db477bdc0735662",
	"name": "usuario1",
	"lastname": "dos Testes",
	"email": "usuario1@email.com"
}

```

## POST /user/login

A rota `POST /user/login` foi desenvolvida para que a pessoa usuária registrada no banco de dados possa logar na aplicação.

entrada:

```json
{
  "body": {
  	"email": "usuario1@email.com",
	  "password": "123456"
  }
}

```

saída *(status: 202)*:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3MjU1Nn0.iK8x5uDNJMVHEv6OX7KK_T1J5KASEQvbgqXZc3Q1I2M",
	"_id": "620dd0ac8db477bdc0735662",
	"name": "usuario1",
	"lastname": "dos Testes",
	"email": "usuario1@email.com"
}

```

## POST /task

A rota `POST /task` foi desenvolvida para a inseção de uma nova tarefa no banco de dados.

entrada:

```json
{
  "body": {
    "priority": "1",
	  "title": "Tarefa 1",
	  "description":"Descrição da tarefa 1",
	  "status": "peding"
  },
  "headers": {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3Mjg0Mn0.dotM8NeQM0MoBS_5oZrM0rCh6DR77rO6sNDQJAozDL8"
  }
}

```

saída *(status: 201)*:

```json
{
	"message": "Task created successfully"
}

```

## GET /task

A rota `GET /task` foi desenvolvida para buscar todas as tarefas da pessoa usuária no banco de dados.

entrada:

```json
{
   "headers": {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3Mjg0Mn0.dotM8NeQM0MoBS_5oZrM0rCh6DR77rO6sNDQJAozDL8"
  }
}

```

saída *(status: 200)*:

```json
[
	{
		"priority": "1",
		"title": "Tarefa 1",
		"status": "peding",
		"created": "2022-02-17T04:46:57.036Z",
		"_id": "620dd3418db477bdc0735663"
	},
	{
		"priority": "1",
		"title": "Tarefa 2",
		"status": "inProcess",
		"created": "2022-02-17T04:49:45.831Z",
		"_id": "620dd3e98db477bdc0735664"
	},
	{
		"priority": "2",
		"title": "Tarefa 3",
		"status": "inProcess",
		"created": "2022-02-17T04:49:57.134Z",
		"_id": "620dd3f58db477bdc0735665"
	}
]

```

## GET /task/:id

A rota `GET /task/:id` foi desenvolvida para buscar e retornar os dados completos de uma tarefa pelo seu id.

entrada:

```json
{
   "headers": {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3Mjg0Mn0.dotM8NeQM0MoBS_5oZrM0rCh6DR77rO6sNDQJAozDL8"
  }
}

```

saída *(status: 200)*:

```json
{
	"_id": "620dd3e98db477bdc0735664",
	"userId": "620dd0ac8db477bdc0735662",
	"title": "Tarefa 2",
	"description": "Descrição da tarefa 2",
	"priority": "1",
	"status": "inProcess",
	"created": "2022-02-17T04:49:45.831Z",
	"updated": "2022-02-17T04:49:45.831Z"
}

```

## PUT /task/:id

A rota `PUT /task/:id` foi desenvolvida para atualizar e retornar os dados completos de uma tarefa pelo seu id.

entrada:

```json
{
  "body": {
    "priority": "4",
	  "title": "Tarefa 2 (editada)",
	  "description":"Descrição da tarefa 2 (editada)",
	  "status": "completed"
  },
  "headers": {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3Mjg0Mn0.dotM8NeQM0MoBS_5oZrM0rCh6DR77rO6sNDQJAozDL8"
  }
}

```

saída *(status: 200)*:

```json
{
	"_id": "620dd3e98db477bdc0735664",
	"userId": "620dd0ac8db477bdc0735662",
	"title": "Tarefa 2 (editada)",
	"description": "Descrição da tarefa 2 (editada)",
	"priority": "4",
	"status": "completed",
	"created": "2022-02-17T04:49:45.831Z",
	"updated": "2022-02-17T04:59:43.867Z"
}

```

## DELETE /task/:id

A rota `DELETE /task/:id` foi desenvolvida para remover uma tarefa do banco de dados pelo seu id.

entrada:

```json
{
   "headers": {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkMGFjOGRiNDc3YmRjMDczNTY2MiIsImVtYWlsIjoidXN1YXJpbzFAZW1haWwuY29tIn0sImlhdCI6MTY0NTA3Mjg0Mn0.dotM8NeQM0MoBS_5oZrM0rCh6DR77rO6sNDQJAozDL8"
  }
}

```

saída *(status: 202)*:

```json
{
	"message": "task removed successfully"
}

```

# Banco de dados

O banco de dados usado para aplicação foi o MongoDB, sendo ele um banco não relacional, tornou-se uma excelente opção para uma aplicação, pois a relação entre os dados da aplicação são simples.

# Validação

Para a validação de entrada foi desenvolvido middlewares, dessa forma evitando o desperdício de recursos com requisições inválidas. Para gerar e validar o token foi utilizado o jsonwebtoken, podendo utilizar informações da pessoa usuária contidas no payload para registro de suas ações evitando uso de recursos para obter essas informações. 


# Tecnologias

- NodeJs
- Express
- Nodemon
- Jest
- Supertest
- MongoDB
- Json Web Token
- Dotenv
- ESlint

<div align="center">
  <img height="100" width="100" src="./assets/icons/nodedotjs.svg"/> 
  &nbsp;&nbsp;&nbsp;
  <img height="100" width="100" src="./assets/icons/express.svg" />
  &nbsp;&nbsp;&nbsp;
  <img height="100" width="100" src="./assets/icons/nodemon.svg" />
  &nbsp;&nbsp;&nbsp;
  <img height="100" width="100" src="./assets/icons/jsonwebtokens.svg" />
  &nbsp;&nbsp;&nbsp;
  <img height="100" width="100" src="./assets/icons/mongodb.svg" />
  &nbsp;&nbsp;&nbsp;
  <img height="100" width="100" src="./assets/icons/jest.svg" />
  &nbsp;&nbsp;&nbsp;
  <img height="100" width="100" src="./assets/icons/eslint.svg" />
</div>

# Testes

Desenvolvido teste de integração para a rota `POST /user`

Para rodar os teste implementado basta executar o comando `npm test`

![resultado dos testes](./assets/testes.png)


# Deploy

Deploy feito no heroku [Heroku](https://www.heroku.com/)

 <img src="./assets/icons/heroku.svg" alt="heroku icon" height="70" width="70">

 <h1><a href="https://todo-list-frontend-green.vercel.app/" >Visite a Aplicação</a></h1>

# Implementações Futuras

- 100% cobertura de testes
- rota de pessoa administradora para direcionar tarefas.
