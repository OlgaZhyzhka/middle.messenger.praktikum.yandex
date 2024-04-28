import Block, { Props } from '@/core/Block';
import { Callback, SIZE } from '@/utils/types';

export interface ModalProps extends Props {
  size: SIZE;
  // isOpen: boolean;
  content: string | Block;
  show?: Callback;
  hide?: Callback;
}
