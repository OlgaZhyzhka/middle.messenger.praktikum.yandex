import EventBus from '@/core/EventBus';
import { cloneDeep } from '@/helpers/cloneDeep';
import { UserDTO } from '@/utils/interfaces';
import { PlainObject } from '@/utils/types';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IStore {
  isLoading: boolean;
  user: UserDTO | null;
  isAuthenticated?: boolean;
  loginError?: string | null;
  signUpError?: string | null;
  profileUpdateError?: string | null;
  isUpdatePassword?: boolean;
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
  user: null,
  loginError: null,
  signUpError: null,
  profileUpdateError: null,
  isAuthenticated: false,
  isUpdatePassword: false,
};

export const store = Store.getInstance(defaultState);
