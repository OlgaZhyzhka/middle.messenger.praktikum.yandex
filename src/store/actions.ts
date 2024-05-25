import { Chat, Message, User } from '@/utils/interfaces';
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

  public getMessages(): Message[] {
    return store.getState().messages;
  }

  public setActiveChatUsers(users: User[]): void {
    store.set({ activeChatUsers: users });
  }

  public geActiveChatId(): number | undefined {
    return store.getState().activeChatId;
  }

  public setActiveChat(chatId: number): void {
    store.set({ activeChatId: chatId });
  }

  public setChats(chats: Chat[]): void {
    store.set({ chats });
  }

  public getChats(): Chat[] | undefined{
    return store.getState().chats;
  }

  public addMessage(message: Message): void {
    const state = store.getState();
    state.messages.push(message);
    store.set({ messages: state.messages });
  }
}

export const actions = new Actions();
