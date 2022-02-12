import { StatusCodes } from 'http-status-codes';

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

export const INTERNAL_ERROR = {
  status: INTERNAL_SERVER_ERROR,
  message: 'Internal Error',
};

export const INVALID_ENTRIES = {
  status: BAD_REQUEST,
  message: 'Invalid entries. Try again.',
};

export const CONFLIT = {};
