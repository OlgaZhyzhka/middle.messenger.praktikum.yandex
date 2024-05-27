import { ChatUser, IChat, IMessage, User } from '@/utils/interfaces';
import { store } from '.';

class Actions {
  public getUser(): User | null {
    return store.getState().user;
  }

  public setUser(user: User | null): void {
    store.set({ user });
  }

  public setAuthenticated(isAuthenticated: boolean): void {
    store.set({ isAuthenticated });
  }

  public setAuthError(error: string | null): void {
    store.set({ authError: error });
  }

  public setUpdateError(error: string | null): void {
    store.set({ updateError: error });
  }

  public setUpdatePassword(isUpdate: boolean): void {
    store.set({ isUpdatePassword: isUpdate });
  }

  public setLoading(isLoading: boolean): void {
    store.set({ isLoading });
  }

  public setChatUsers(users: ChatUser[]): void {
    store.set({ chatUsers: users });
  }

  public getChatUsers(): ChatUser[] | undefined {
    return store.getState().chatUsers;
  }

  public geActiveChatId(): number | null {
    return store.getState().activeChatId;
  }

  public setActiveChatId(chatId: number | null): void {
    store.set({ activeChatId: chatId });
  }

  public setChats(chats: IChat[]): void {
    store.set({ chats });
  }

  public addChats(chat: IChat): void {
    const state = store.getState();
    state.chats.push(chat);
    store.set({ chats: state.chats });
  }

  public getChats(): IChat[] | undefined {
    return store.getState().chats;
  }

  public deleteChat(chatId: number): void {
    const state = store.getState();
    state.chats = state.chats.filter((chat) => chat.id !== chatId);
    store.set({ chats: state.chats });
  }

  public addMessage(message: IMessage): void {
    const state = store.getState();
    state.messages.push(message);
    store.set({ messages: state.messages });
  }

  public setMessages(messages: IMessage[]): void {
    const messageItems = messages.reverse();
    store.set({ messages: messageItems });
  }

  public getMessages(messages: IMessage[]): void {
    const messageItems = messages.reverse();
    store.set({ messages: messageItems });
  }

  public setChatListLoading(isLoading: boolean): void {
    store.set({ isChatListLoading: isLoading });
  }

  public setChatLogLoading(isLoading: boolean): void {
    store.set({ isChatLogLoading: isLoading });
  }
}

export const actions = new Actions();
