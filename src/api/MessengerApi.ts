import { User } from "@/utils/interfaces";
import BaseAPI from "./BaseApi";

class MessengerAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public create(title?: string): Promise<string> {
    return this.HTTP.post('/', { data: { title }, withCredentials: true });
  }

  public addUsers(data: { id: string; users: User[] }): Promise<string> {
    return this.HTTP.put('/users', { data, withCredentials: true });
  }

  public request(): Promise<string> {
    return this.HTTP.get('/', { withCredentials: true });
  }
}

export default MessengerAPI;
