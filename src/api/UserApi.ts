import { ApiResponse, UpdatePassword, UpdateUserDTO } from '@/utils/interfaces';
import BaseAPI from './BaseApi';

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public async updateProfile(user: UpdateUserDTO): Promise<ApiResponse> {
    const response = await this.HTTP.put('/profile', { data: user, withCredentials: true });
    return response as ApiResponse;
  }

  public async updatePassword(passwords: UpdatePassword): Promise<ApiResponse> {
    const response = await this.HTTP.put('/password', { data: passwords, withCredentials: true });
    return response as ApiResponse;
  }

  public updateAvatar(file: File): Promise<ApiResponse> {
    const data = new FormData();
    data.append('avatar', file);
    return this.HTTP.put('/profile/avatar', { data, withCredentials: true });
  }

  public getUserById(id: string): Promise<ApiResponse> {
    return this.HTTP.get(`/${id}`, { withCredentials: true });
  }

  public findUser(login: string): Promise<ApiResponse> {
    return this.HTTP.post('/search', { data: { login }, withCredentials: true });
  }
}

export default UserAPI;
