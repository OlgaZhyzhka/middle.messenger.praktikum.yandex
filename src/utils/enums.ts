export const enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export const enum Routes {
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

export enum AuthMode {
  OnlyAuthorized,
  OnlyNotAuthorized,
  Any,
}
