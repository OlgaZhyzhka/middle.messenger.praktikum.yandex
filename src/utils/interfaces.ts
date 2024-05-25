export interface RouteOptions {
  rootQuery?: string;
  title?: string;
}

export interface RouteOptionsWithProps extends RouteOptions {
  props?: Record<string, unknown>;
}

export interface RegistrationFormData {
  login: string;
  password: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
}

export type UpdateFormData = Omit<RegistrationFormData, 'password'> & {
  chatName: string;
};


export interface UpdateProfileData {
  login?: string;
  email?: string;
  firstName?: string;
  secondName?: string;
  chatName?: string;
  phone?: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
  avatar: string;
}

export type CreateUser = Omit<User, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export interface UpdateUser extends Omit<User, 'avatar' | 'id'> {}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface MessageFile {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
}

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: MessageFile;
}


export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  unread_count?: number;
  last_message?: {
    user: User;
    time: string;
    content: string;
  };
}

export interface ApiError {
  reason?: string;
}

export interface ApiResponse {
  status: number;
  response?: string | ApiError;
  token?: string;
}

export interface SignUpResponse {
  id: string;
}

export interface LogoutResponse {
  message: string;
}
