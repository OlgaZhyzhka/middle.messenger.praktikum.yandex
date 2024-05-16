import { APIError, CreateUserDTO, SignInRequest, SignUpResponse, UserDTO } from '@/utils/interfaces';
import BaseAPI from './BaseApi';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signIn(user?: SignInRequest): Promise<void | APIError> {
    if (!user) {
      throw new Error('"user" is required');
    }

    return this.HTTP.post('/signin', { data: user, withCredentials: true });
  }

  public signUp(user?: CreateUserDTO): Promise<SignUpResponse> {
    if (!user) {
      throw new Error('"user" is required');
    }

    return this.HTTP.post('/signup', { data: user, withCredentials: true });
  }

  public getUser(): Promise<UserDTO | APIError> {
    return this.HTTP.get('/user', { withCredentials: true });
  }

  public logout(): Promise<void | APIError> {
    return this.HTTP.post('/logout', { withCredentials: true });
  }
}

export default AuthAPI; 