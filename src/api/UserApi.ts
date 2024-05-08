import { UpdatePassword, User } from '@/utils/interfaces';
import BaseAPI from "./BaseApi";

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public updateProfile(user: User): Promise<string> {
    return this.HTTP.put('/profile', { data: user, withCredentials: true });
  }

  public updatePassword(passwords: UpdatePassword): Promise<string> {
    return this.HTTP.put('/password', { data: passwords, withCredentials: true });
  }

  public updateAvatar(file: File): Promise<string> {
    const data = new FormData();
    data.append('avatar', file);
    return this.HTTP.put('/profile/avatar', { data, withCredentials: true });
  }

  public findUser(login: string): Promise<string> {
    return this.HTTP.post('/search', { data: { login }, withCredentials: true });
  }
}

export default UserAPI;