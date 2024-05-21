import BaseAPI from './BaseApi';

class ChatMessagesAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public request(id?: string): Promise<string> {
    if (!id) {
      throw new Error('id is required');
    }
    return this.HTTP.post(`/token/${id}`, { withCredentials: true });
  }
}

export default ChatMessagesAPI;
