export const LOGIN_RENDER = 'LOGIN_RENDER';

export const LOGGED = 'LOGGED';

export const ERROR = 'ERROR';

export const MESSAGE = 'MESSAGE';

export const TASK_FORM = 'RENDER_TASK_FORM';

export const EDIT_TASK = 'EDIT_TASK';

export const RESET = 'RESET';

export const actionLoginRender = (state) => ({ type: LOGIN_RENDER, state });

export const actionlogged = (state) => ({ type: LOGGED, state });

export const actionError = (state) => ({ type: ERROR, state });

export const actionMessage = (state) => ({ type: MESSAGE, state });

export const actionTaskForm = (state) => ({ type: TASK_FORM, state });

export const actionEditTask = (state) => ({ type: EDIT_TASK, state });

export const actionReset = { type: RESET };
