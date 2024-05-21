import BaseAPI from './BaseApi';

class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChatUsers(id: number): Promise<string> {
    return this.HTTP.get(`/${id}/users`, { withCredentials: true });
  }

  public updateChatAvatar(avatar: File, id: string): Promise<string> {
    const data = new FormData();
    data.append('chatId', id);
    data.append('avatar', avatar);
    return this.HTTP.put('/avatar', { data, withCredentials: true });
  }

  public addUsersToChat(users: number[], id: string): Promise<string> {
    return this.HTTP.put('/users', { data: { users, id }, withCredentials: true });
  }

  public deleteUsersFromChat(users: number[], id: string): Promise<string> {
    return this.HTTP.delete('/users', { data: { users, id }, withCredentials: true });
  }

  public deleteChat(id?: string): Promise<string> {
    if (!id) {
      throw new Error('id is required');
    }

    return this.HTTP.delete('', { data: { id }, withCredentials: true });
  }
}

export default ChatAPI;
