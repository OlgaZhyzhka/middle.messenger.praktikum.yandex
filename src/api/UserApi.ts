import { ApiResponse, UpdatePassword, UpdateUser } from '@/utils/interfaces';
import BaseApi from './BaseApi';

class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  public async updateProfile(user: UpdateUser): Promise<ApiResponse> {
    const response = await this.HTTP.put('/profile', { data: user });
    return response as ApiResponse;
  }

  public async updatePassword(passwords: UpdatePassword): Promise<ApiResponse> {
    const response = await this.HTTP.put('/password', { data: passwords});
    return response as ApiResponse;
  }

  public updateAvatar(data: FormData): Promise<ApiResponse> {
    return this.HTTP.put('/profile/avatar', { data });
  }

  public findUser(login: string): Promise<ApiResponse> {
    return this.HTTP.post('/search', { data: { login } });
  }
}

export default UserApi;
