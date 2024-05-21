/* eslint-disable @typescript-eslint/naming-convention */

export const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  REDIRECT = 300,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const enum ERRORS_MESSAGES {
  USER_IN_SYSTEM = 'User already in system',
  USER_REQUIRED = 'User is required',
  NETWORK = 'Network Error',
  ABORTED = 'Request aborted',
  TIMEOUT = 'Timeout exceeded',
  ERROR = 'Error',
}

export enum WS_EVENTS {
  open = 'open',
  message = 'message',
  error = 'error',
  close = 'close',
}

export const enum ROUTES {
  Home = '/',
  Login = '/login',
  Logout = '/logout',
  Registration = '/sign-up',
  Messenger = '/messenger',
  Settings = '/settings',
  SettingsEdit = '/settings-edit',
  SettingsPassword = '/settings-password',
  Error500 = '/500',
  Error404 = '/404',
}
