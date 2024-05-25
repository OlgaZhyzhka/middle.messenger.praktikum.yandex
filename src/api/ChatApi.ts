import { ApiResponse } from '@/utils/interfaces';

import BaseApi from './BaseApi';

class ChatApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  public addChat(title: string): Promise<ApiResponse> {
    return this.HTTP.post('', { data: { title } });
  }

  public getChats(): Promise<ApiResponse> {
    return this.HTTP.get('');
  }

  public addUsersToChat(chaiId: number, userId: number): Promise<ApiResponse> {
    return this.HTTP.put('/users', { data: { users: { userId }, chaiId } });
  }

  public deleteUsersFromChat(chaiId: number, userId: number): Promise<string> {
    return this.HTTP.delete('/users', { data: { users: { userId }, chaiId } });
  }

  public getChatUsers(id: number): Promise<ApiResponse> {
    return this.HTTP.get(`/${id}/users`);
  }

  public updateChatAvatar(data: FormData, id: string): Promise<ApiResponse> {
    // const data = new FormData();
    data.append('chatId', id);
    // data.append('avatar', avatar);
    return this.HTTP.put('/avatar', { data });
  }

  public deleteChat(id?: string): Promise<ApiResponse> {
    if (!id) {
      throw new Error('ChatApi.delete: need chat id');
    }

    return this.HTTP.delete('', { data: { id } });
  }

  public getToken(chatId: number): Promise<ApiResponse> {
    return this.HTTP.post(`/token/${chatId}`);
  }
}

export default ChatApi;
