import Block, { Props } from '@/core/Block';
import { PlainObject } from '@/utils/types';
import store, { StoreEvents } from '@/store';
import isEqual from './isEqual';

type BlockConstructorType<T> = {
  new (props: T): Block;
};


const connect = <T = Props>(
  BlockConstructor: BlockConstructorType<T>,
  mapStateToProps: (state: PlainObject) => PlainObject
): typeof Block => class extends BlockConstructor {
    public static EVENTS = Block.EVENTS;

    constructor(props?: PlainObject) {
      let state = mapStateToProps(store.getState());

      super({ ...props, ...state } as T);

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
          state = newState;
        }
      });
    }
  };

export default connect;