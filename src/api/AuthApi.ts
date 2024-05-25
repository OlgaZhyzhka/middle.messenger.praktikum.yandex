import { ApiResponse, CreateUser, SignInRequest } from '@/utils/interfaces';
import { ERRORS_MESSAGES } from '@/utils/enums';

import BaseApi from './BaseApi';

class AuthAPI extends BaseApi {
  constructor() {
    super('/auth');
  }

  public async signIn(user?: SignInRequest): Promise<ApiResponse> {
    if (!user) {
      throw new Error(ERRORS_MESSAGES.USER_REQUIRED);
    }

    const response = await this.HTTP.post('/signin', { data: user });
    return response as ApiResponse;
  }

  public async signUp(user?: CreateUser): Promise<ApiResponse> {
    if (!user) {
      throw new Error(ERRORS_MESSAGES.USER_REQUIRED);
    }

    const response = await this.HTTP.post('/signup', { data: user });
    return response as ApiResponse;
  }

  public async logout(): Promise<ApiResponse> {
    const response = await this.HTTP.post('/logout');
    return response as ApiResponse;
  }

  public async getUser(): Promise<ApiResponse> {
    const response = await this.HTTP.get('/user');
    return response as ApiResponse;
  }
}

export default AuthAPI;
