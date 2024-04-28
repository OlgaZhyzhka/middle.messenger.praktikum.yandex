import EventBus from "@/core/EventBus";
import { set } from "@/helpers";
import { cloneDeep } from "@/helpers/cloneDeep";
import { Indexed } from "@/utils/types";

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: Indexed = {};

  public getState(): Indexed {
    return cloneDeep(this.state);
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}
