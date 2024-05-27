import ChatApi from '@/api/ChatApi';
import { WS_URL } from '@/api/http/ApiUrl';
import WS from '@/api/ws/WebSocket';
import { handleError } from '@/helpers/handleError';
import { actions } from '@/store/actions';
import { ChatUser, IChat } from '@/utils/interfaces';
import { HTTP_CODES, WS_EVENTS } from '@/utils/enums';

const chatApi = new ChatApi();

class ChatService {
  private static socket?: WS;

  public static async createChat(title: string): Promise<void> {
    try {
      const response = await chatApi.addChat(title);
      const { status, ...chatData } = response;

      if (status === HTTP_CODES.OK) {
        actions.setActiveChatId((chatData as IChat).id);
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
      actions.setChatListLoading(true);
      const resp = await chatApi.getChats();
      const { status, response } = resp;

      if (status === HTTP_CODES.OK) {
        actions.setChats(response as IChat[]);
        if ((response as IChat[])?.length === 0) {
          await ChatService.createChat('Default Chat');
        }
      } else {
        throw new Error('Failed to retrieve chats');
      }
    } catch (error: unknown) {
      console.error(error);
      handleError(error);
    } finally {
      actions.setChatListLoading(false);
    }
  }

  public static async connectToChat(userId: number, chatId: number): Promise<void> {
    const { token } = await chatApi.getToken(chatId);
    const url = `${WS_URL}${userId}/${chatId}/${token}`;
    this.socket = new WS(url);
    await this.socket.connect();

    this.socket.on(WS_EVENTS.message, (data) => {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      if (Array.isArray(parsedData)) {
        actions.setMessages(parsedData);
        actions.setChatLogLoading(false);
        console.log('Old messages are received', parsedData);
      } else {
        actions.addMessage(parsedData);
        console.log('New message is received', parsedData);
      }
    });

    this.socket.on(WS_EVENTS.close, (event) => {
      console.log('Connection is closed', event);
    });

    this.socket.on(WS_EVENTS.error, (event) => {
      console.log('Error connection', event);
    });

    this.getOldMessages();
  }

  public static sendMessage(message: string): void {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send({ content: message, type: 'message' });
  }

  public static getOldMessages(offset: number = 0): void {
    actions.setChatLogLoading(true);
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send({ content: offset.toString(), type: 'get old' });
  }

  public static async getChatUsers(id: number): Promise<void> {
    try {
      const res = await chatApi.getChatUsers(id);

      if (res.status !== HTTP_CODES.OK) {
        throw new Error(`requestErr: ${JSON.stringify(res)}`);
      }
      const users = res.response as ChatUser[];
      actions.setChatUsers(users);
    } catch (error: unknown) {
      console.error(error);
      handleError(error);
    }
  }

  public static async setActiveChat(chatId: number): Promise<void> {
    try {
      actions.setActiveChatId(chatId);
      await this.getChatUsers(chatId);
      const userId = actions.getUser()?.id;

      if (userId) {
        await this.connectToChat(userId, chatId);
      }
    } catch (error: unknown) {
      console.error(error);
      handleError(error);
    }
  }

  public static disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default ChatService;
