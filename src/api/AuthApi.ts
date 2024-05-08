import { AuthRequest, User } from '@/utils/interfaces';
import BaseAPI from './BaseApi';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signIn(user?: AuthRequest): Promise<string> {
    if (!user) {
      throw new Error('"user" is required');
    }

    return this.HTTP.post('/signin', { data: user, withCredentials: true });
  }

  public signUp(user?: User): Promise<string> {
    if (!user) {
      throw new Error('"user" is required');
    }

    return this.HTTP.post('/signup', { data: user, withCredentials: true });
  }

  public getUser(): Promise<string> {
    return this.HTTP.get('/user', { withCredentials: true });
  }

  public logout(): Promise<string> {
    return this.HTTP.post('/logout', { withCredentials: true });
  }
}

export default AuthAPI; 