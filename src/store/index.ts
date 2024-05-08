import EventBus from "@/core/EventBus";
import { set } from "@/helpers";
import { cloneDeep } from "@/helpers/cloneDeep";
import { PlainObject } from '@/utils/types';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: PlainObject = {};

  public getState(): PlainObject {
    return cloneDeep(this.state);
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export default store;