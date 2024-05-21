import { PlainObject } from './types';

export interface RouteOptions {
  rootQuery?: string;
  title?: string;
}

export interface RouteOptionsWithProps extends RouteOptions {
  props?: Record<string, unknown>;
}

export interface Avatar extends PlainObject {
  avatar: File;
}

export interface RegistrationFormData {
  login: string;
  password: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
}

export interface UpdateProfileData {
  login?: string;
  email?: string;
  firstName?: string;
  secondName?: string;
  chatName?: string;
  phone?: string;
}

export interface UserDTO extends PlainObject<string> {
  id: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
  avatar: string;
}

export type CreateUserDTO = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export interface UpdateUserDTO extends Omit<UserDTO, 'avatar' | 'id'> {}

export interface SignInRequest extends PlainObject<string> {
  login: string;
  password: string;
}

export interface UpdatePassword extends PlainObject<string> {
  oldPassword: string;
  newPassword: string;
}

export interface ApiError {
  reason?: string;
}

export interface ApiResponse {
  status: number;
  response?: string | ApiError;
}

export interface SignUpResponse {
  id: string;
}

export interface LogoutResponse {
  message: string;
}
