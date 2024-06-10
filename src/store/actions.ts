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

  public setLoginError(error: string | null): void {
    store.set({ loginError: error });
  }

  public setSignUpError(error: string | null): void {
    store.set({ signUpError: error });
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

  public deleteChatUser(userId: number): void {
    store.set({
      chatUsers: store.getState().chatUsers.filter((user) => user.id !== userId),
    });
  }

  public getActiveChatId(): number | null {
    return store.getState().activeChatId;
  }

  public setActiveChatId(chatId: number | null): void {
    store.set({ activeChatId: chatId });
  }

  public setChats(chats: IChat[]): void {
    store.set({ chats });
  }

  public getChats(): IChat[] | undefined {
    return store.getState().chats;
  }

  public getChatById(chatId: number): IChat | undefined {
    return store.getState().chats.find((chat) => chat.id === chatId);
  }

  public deleteChat(chatId: number): void {
    store.set({
      chats: store.getState().chats.filter((chat) => chat.id !== chatId),
    });
    store.set({
      messages: store.getState().messages.filter((message) => message.chat_id !== chatId),
    });

    const activeChatId = this.getActiveChatId();

    if (activeChatId === chatId) {
      this.setActiveChatId(null);
    }
  }

  public updateChatAvatar(chatId: number, avatar: string): void {
    store.set({
      chats: store.getState().chats.map((chat) => (chat.id === chatId ? { ...chat, avatar } : chat)),
    });
  }

  public addMessage(message: IMessage): void {
    store.set({
      messages: [...store.getState().messages, message],
    });
  }

  public setMessages(messages: IMessage[]): void {
    const messageItems = messages.reverse();
    store.set({ messages: messageItems });
  }

  public getMessages(messages: IMessage[]): void {
    const messageItems = messages.reverse();
    store.set({ messages: messageItems });
  }

  public setChatListLoading(isChatListLoading: boolean): void {
    store.set({ isChatListLoading });
  }

  public setChatLogLoading(isChatLogLoading: boolean): void {
    store.set({ isChatLogLoading });
  }

  public setChatUsersLoading(isChatUserLoading: boolean): void {
    store.set({ isChatUserLoading });
  }
}

export const actions = new Actions();
