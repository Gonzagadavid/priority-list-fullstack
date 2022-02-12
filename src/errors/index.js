import { StatusCodes } from 'http-status-codes';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export const INTERNAL_ERROR = {
  status: INTERNAL_SERVER_ERROR,
  message: 'Internal Error',
};

export const CONFLIT = {};
