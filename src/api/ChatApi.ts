import { ApiResponse } from '@/utils/interfaces';

import BaseApi from './BaseApi';
import HTTPTransport from './http/HTTPTransport';

class ChatApi extends BaseApi {
  private http: HTTPTransport = new HTTPTransport();

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

  public addUserToChat(userId: number, chatId: number): Promise<ApiResponse> {
    return this.HTTP.put('/users', { data: { users: [userId], chatId } });
  }

  public deleteUsersFromChat(userId: number, chatId: number): Promise<ApiResponse> {
    return this.HTTP.delete('/users', { data: { users: [userId], chatId } });
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

  public sendFile(file: File): Promise<ApiResponse> {
    const data = new FormData();
    data.append('resource', file);
    return this.http.post('/resources', { data });
  }

  public getFile(path: string): Promise<ApiResponse> {
    return this.HTTP.get(`/resources/${path}`);
  }

  public getToken(chatId: number): Promise<ApiResponse> {
    return this.HTTP.post(`/token/${chatId}`);
  }
}

export default ChatApi;
