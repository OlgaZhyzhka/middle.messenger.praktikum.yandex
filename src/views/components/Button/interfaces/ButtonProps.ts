import Block, { Props } from '@/core/Block';
import { SIZE, VARIANT, SHAPE, Callback } from '@/utils/types';

export interface ButtonProps extends Props {
  variant?: VARIANT;
  shape?: SHAPE;
  size?: SIZE;
  children?: string | Block;
  onClick?: Callback;
}
