export const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}


export enum WebSocketEvents{
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
  Error404 = '/404',
  Error500 = '/500',
}

export enum MODE {
  OnlyAuthorized,
  OnlyNotAuthorized,
  Any,
}
