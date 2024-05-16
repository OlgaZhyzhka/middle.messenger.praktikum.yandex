import EventBus from '@/core/EventBus';
import { cloneDeep } from '@/helpers/cloneDeep';
import { UserDTO } from '@/utils/interfaces';
import { PlainObject } from '@/utils/types';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IStore {
  isLoading: boolean;
  loginFields: Record<string, string> | null;
  user: UserDTO | null;
}

class Store extends EventBus {
  private state: PlainObject = {};

  private static __instance: Store | null = null;

  constructor(defaultState: PlainObject = {}) {
    super();
    this.state = cloneDeep(defaultState);
  }

  public static getInstance(defaultState?: PlainObject): Store {
    if (!Store.__instance) {
      Store.__instance = new Store(defaultState);
    }
    return Store.__instance;
  }

  public getState(): PlainObject {
    return cloneDeep(this.state);
  }

  public set(nextState: PlainObject): void {
    const prevState = this.getState();
    this.state = { ...this.state, ...nextState };

    if (this.listeners[StoreEvents.Updated]) {
      this.emit(StoreEvents.Updated, prevState, nextState);
    }

    // this.emit(STORE_EVENTS.Updated, prevState, this.getState());
  }
}

export const store = Store.getInstance();
