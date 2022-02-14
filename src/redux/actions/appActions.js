export const LOGIN_RENDER = 'LOGIN_RENDER';

export const LOGGED = 'LOGGED';

export const ERROR = 'ERROR';

export const MESSAGE = 'MESSAGE';

export const actionLoginRender = (state) => ({ type: LOGIN_RENDER, state });

export const actionlogged = (state) => ({ type: LOGGED, state });

export const actionError = (state) => ({ type: ERROR, state });

export const actionMessage = (state) => ({ type: MESSAGE, state });
