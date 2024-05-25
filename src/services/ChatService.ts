import ChatApi from '@/api/ChatApi';
import { WS_URL } from '@/api/http/ApiUrl';
import WS from '@/api/ws/WebSocket';
import { handleError } from '@/helpers/handleError';
import { actions } from '@/store/actions';
import { HTTP_CODES, WS_EVENTS } from '@/utils/enums';
import { Chat } from '@/utils/interfaces';

const chatApi = new ChatApi();

class ChatService {
  private static socket?: WS;

  public static async createChat(title: string): Promise<void> {
    try {
      const response = await chatApi.addChat(title);
      const { status, ...chatData } = response;

      if (status === HTTP_CODES.OK) {
        actions.setActiveChat((chatData as Chat).id);
        console.log('Chat created successfully', chatData);
      } else {
        throw new Error('Failed to create chat');
      }
    } catch (error: unknown) {
      console.error(error);
      handleError(error);
    }
  }

  public static async getChats(): Promise<void> {
    try {
      const resp = await chatApi.getChats();
      const { status, response } = resp;

      if (status === HTTP_CODES.OK) {
        actions.setChats(response as Chat[]);
        console.log('Chats retrieved successfully', response);
      } else {
        throw new Error('Failed to retrieve chats');
      }
    } catch (error: unknown) {
      console.error(error);
      handleError(error);
    }
  }

  public static async connectToChat(userId: number, chatId: number): Promise<void> {
    const { token } = await chatApi.getToken(chatId);
    const url = `${WS_URL}${userId}/${chatId}/${token}`;
    this.socket = new WS(url);
    await this.socket.connect();

    this.socket.on(WS_EVENTS.message, (data) => {
      actions.addMessage(data);
      console.log('Data is received', data);
    });

    this.socket.on(WS_EVENTS.close, (event) => {
      console.log('Connection is closed', event);
    });

    this.socket.on(WS_EVENTS.error, (event) => {
      console.log('Error connection', event);
    });
  }

  public static sendMessage(message: string): void {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send({ content: message, type: 'message' });
  }

  public static getOldMessages(offset: number = 0): void {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send({ content: offset.toString(), type: 'get old' });
  }

  public static disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  public static async getChatUsers(id: number): Promise<void> {
    try {
      const res = await chatApi.getChatUsers(id);

      if (res.status !== HTTP_CODES.OK) {
        throw new Error(`requestErr: ${JSON.stringify(res)}`);
      }

      console.log(res);

      // const users = JSON.parse(res.response);
      // actions.setActiveChatUsers(users);
    } catch (error: unknown) {
      console.error(error);
      handleError(error);
    }
  }
}

export default ChatService;
