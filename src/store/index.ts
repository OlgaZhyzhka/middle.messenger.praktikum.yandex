import EventBus from '@/core/EventBus';
import { cloneDeep } from '@/helpers/cloneDeep';
import { ChatUser, IChat, IMessage, User } from '@/utils/interfaces';
import { PlainObject } from '@/utils/types';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IStore {
  isLoading: boolean;
  user: User | null;
  messages: IMessage[];
  chats: IChat[];
  chatUsers: ChatUser[];
  activeChatId: number | null;
  isAuthenticated: boolean;
  isChatListLoading?: boolean;
  isChatLogLoading?: boolean;
  isChatUserLoading?: boolean;
  isUpdatePassword?: boolean;
  loginError?: string | null;
  signUpError?: string | null;
  updateError?: string | null;
}

class Store extends EventBus {
  private state: IStore;

  private static __instance: Store | null = null;

  constructor(defaultState: PlainObject = {}) {
    super();
    this.state = { isLoading: false, user: null, ...defaultState } as IStore;
  }

  public static getInstance(defaultState?: PlainObject): Store {
    if (!Store.__instance) {
      Store.__instance = new Store(defaultState);
    }
    return Store.__instance;
  }

  public getState(): IStore {
    return cloneDeep(this.state);
  }

  public set(nextState: Partial<IStore>): void {
    const prevState = this.getState();
    this.state = { ...this.state, ...nextState } as IStore;

    if (this.listeners[StoreEvents.Updated]) {
      this.emit(StoreEvents.Updated, prevState, nextState);
    }
  }

}

const defaultState: PlainObject = {
  isLoading: false,
  isAuthenticated: false,
  isChatListLoading: true,
  isChatLogLoading: true,
  isChatUserLoading: true,
  loginError: null,
  signUpError: null,
  user: null,
  activeChatId: null,
  messages: [],
  chats: [],
  chatUsers: [],
};

export const store = Store.getInstance(defaultState);
