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

  public getChat(id: number): Promise<ApiResponse> {
    return this.HTTP.get(`/${id}/common`);
  }

  public getChatUsers(id: number): Promise<ApiResponse> {
    return this.HTTP.get(`/${id}/users`);
  }

  public addUsersToChat(chaiId: number, userId: number): Promise<ApiResponse> {
    return this.HTTP.put('/users', { data: { users: { userId }, chaiId } });
  }

  public deleteUsersFromChat(chatId: number, userId: number): Promise<ApiResponse> {
    return this.HTTP.delete('/users', { data: { users: [userId], chatId } });
  }

  public addUserToChat(chatId: number, userId: number): Promise<ApiResponse> {
    return this.HTTP.put('/users', { data: { users: [userId], chatId } });
  }

  public updateChatAvatar(file: File, chatId: number): Promise<ApiResponse> {
    const data = new FormData();
    data.append('chatId', chatId as unknown as string);
    data.append('avatar', file);
    return this.HTTP.put('/avatar', { data });
  }

  public deleteChat(chatId?: number): Promise<ApiResponse> {
    if (!chatId) {
      throw new Error('ChatApi.delete: need chat id');
    }

    return this.HTTP.delete('', { data: { chatId } });
  }

  public getToken(chatId: number): Promise<ApiResponse> {
    return this.HTTP.post(`/token/${chatId}`);
  }
}

export default ChatApi;
