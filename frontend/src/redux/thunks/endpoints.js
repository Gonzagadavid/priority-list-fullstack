// endpoints para produção, para rodar localmente comente o endpoints abaixo

export const LOGIN = 'https://todo-priority-list.herokuapp.com/user/login';

export const SIGNUP = 'https://todo-priority-list.herokuapp.com/user';

export const GET_TASKS = 'https://todo-priority-list.herokuapp.com/task';

export const TASK_BY_ID = (id) => `https://todo-priority-list.herokuapp.com/task/${id}`;

// para rodar a aplicação localmente descomente os endpoints abaixo

// export const LOGIN = 'https://localhost:3800/user/login';

// export const SIGNUP = 'https://localhost:3800/user';

// export const GET_TASKS = 'https://localhost:3800/task';

// export const TASK_BY_ID = (id) => `https://localhost:3800/task/${id}`;
