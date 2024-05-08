import { Method } from "./enums";
import { PlainObject } from "./types";

export interface RouteOptions {
  rootQuery?: string;
  title?: string;
}

export interface RouteOptionsWithProps extends RouteOptions {
  props?: Record<string, unknown>;
}

export interface Options {
  headers?: { [key: string]: string };
  method?: Method;
  data?: unknown;
  retries?: number;
  withCredentials?: boolean;
}

export interface Avatar extends PlainObject {
  avatar: File;
}


export interface User extends PlainObject<string> {
  id: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
  avatar: string;
}

export interface AuthRequest extends PlainObject<string> {
  login: string;
  password: string;
}

export interface UpdatePassword extends PlainObject<string> {
  oldPassword: string;
  newPassword: string;
}

export enum WebSocketEvents {
  open = 'open',
  message = 'message',
  error = 'error',
  close = 'close',
}
