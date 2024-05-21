import Block, { Props } from '@/core/Block';
import { IStore, store, StoreEvents } from '@/store';
import { PlainObject } from '@/utils/types';
import isEqual from './isEqual';

type BlockConstructorType<T> = {
  new (props: T): Block;
  EVENTS: typeof Block.EVENTS;
};

const connect =
  <T = Props>(mapStateToProps: (state: IStore) => PlainObject) =>
  (BlockConstructor: BlockConstructorType<T>): BlockConstructorType<T> =>
    class ConnectedBlock extends BlockConstructor {
      private onChangeStoreCallback: () => void;

      constructor(props: T) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state } as T);

        this.onChangeStoreCallback = (): void => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            console.log(newState);
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      public componentWillUnmount(): void {
        super.componentWillUnmount();
        store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };

export default connect;
