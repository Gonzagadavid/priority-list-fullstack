import { StatusCodes } from 'http-status-codes';

const {
  INTERNAL_SERVER_ERROR, BAD_REQUEST, CONFLICT, NOT_FOUND, UNAUTHORIZED,
} = StatusCodes;

export const INTERNAL_ERROR = {
  status: INTERNAL_SERVER_ERROR,
  message: 'Internal Error',
};

export const INVALID_ENTRIES = {
  status: BAD_REQUEST,
  message: 'Invalid entries. Try again.',
};

export const EMAIL_ALREADY_REGISTERED = {
  status: CONFLICT,
  message: 'Email already registered',
};

export const USER_NOT_FOUND = {
  status: NOT_FOUND,
  message: 'User not found',
};

export const INCORRECT_PASSWORD = {
  status: UNAUTHORIZED,
  message: 'Incorrect password',
};
