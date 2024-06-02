import ChatApi from '@/api/ChatApi';
import { WS_URL } from '@/api/http/ApiUrl';
import WS from '@/api/ws/WebSocket';
import { handleApiError } from '@/helpers/handleApiError';
import { handleResponseError } from '@/helpers/handleResponseError';
import { actions } from '@/store/actions';
import {
  ApiError,
  ApiResponse,
  ChatUser,
  DeleteChatResponse,
  IChat,
  UpdateChatAvatarResponse,
} from '@/utils/interfaces';
import { ERRORS_MESSAGES, HTTP_CODES, WS_EVENTS } from '@/utils/enums';
import { isAPIError } from '@/utils/guards';

const chatApi = new ChatApi();

class ChatService {
  private static socket?: WS;

  public static async createChat(title: string): Promise<void> {
    try {
      const response = await chatApi.addChat(title);
      this.checkResponse(response);
      await this.getChats();
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  public static async deleteChat(chatId: number): Promise<void> {
    try {
      const response = await chatApi.deleteChat(chatId);
      this.checkResponse(response);
      const { ...data } = response as unknown as DeleteChatResponse;
      actions.deleteChat(chatId);
      this.disconnect();
      console.log('Chat deleted successfully', data.result.title);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  public static async getChats(): Promise<void> {
    try {
      actions.setChatListLoading(true);
      const response = await chatApi.getChats();
      this.checkResponse(response);
      const { data } = response;
      console.log('Chats are received', response);
      actions.setChats(data as IChat[]);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
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
        console.log('Old messages are received', parsedData);
        actions.setChatLogLoading(false);
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

  public static async setActiveChat(chatId: number): Promise<void> {
    try {
      actions.setActiveChatId(chatId);
      await this.getChatUsers(chatId);
      const userId = actions.getUser()?.id;

      if (userId) {
        await this.connectToChat(userId, chatId);
      }
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  public static async getChatUsers(chatId: number): Promise<void> {
    try {
      actions.setChatUsersLoading(true);
      const response = await chatApi.getChatUsers(chatId);
      this.checkResponse(response);
      const { data } = response;
      actions.setChatUsers(data as ChatUser[]);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      actions.setChatUsersLoading(false);
    }
  }

  public static async deleteUserFromChat(userId: number, chatId: number): Promise<void> {
    try {
      const response = await chatApi.deleteUsersFromChat(userId, chatId);
      this.checkResponse(response);
      actions.deleteChatUser(userId);
      this.disconnect();
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  public static async addUserToChat(userId: number, chatId: number): Promise<void> {
    try {
      const response = await chatApi.addUserToChat(userId, chatId);
      this.checkResponse(response);
      await this.getChatUsers(chatId);
      console.log('User added to chat successfully');
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  public static async updateChatAvatar(file: File, chatId: number): Promise<void> {
    try {
      const response = await chatApi.updateChatAvatar(file, chatId);
      this.checkResponse(response);
      const { id, avatar } = response as unknown as UpdateChatAvatarResponse;
      actions.updateChatAvatar(id, avatar);
      console.log('Avatar updated successfully');
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  public static getOldMessages(offset: number = 0): void {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    actions.setChatLogLoading(true);

    this.socket.send({ content: offset.toString(), type: 'get old' });
  }

  public static sendMessage(message: string, type: string): void {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send({ content: message, type });
  }

  public static async sendFile(file: File): Promise<void> {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    const response = await chatApi.sendFile(file);
    this.checkResponse(response);

    
    const { status, ...fileData } = response;
    const message = String(fileData.id);
    this.sendMessage(message, 'file');
  }

  public static disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private static checkResponse(response: ApiResponse | ApiError): void {
    if (!response) {
      throw new Error(ERRORS_MESSAGES.RESPONSE_ERROR);
    }

    const { status } = response;

    if (isAPIError(response)) {
      throw new Error(response.reason);
    }

    if (status !== HTTP_CODES.OK) {
      throw new Error(`requestErr: ${JSON.stringify(response)}`);
    }
  }
}

export default ChatService;
