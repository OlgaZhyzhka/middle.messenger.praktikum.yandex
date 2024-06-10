import Block, { Props } from '@/core/Block';
import { SIZE, VARIANT, SHAPE, EventCallback } from '@/utils/types';

export interface ButtonProps extends Props {
  variant?: VARIANT;
  shape?: SHAPE;
  size?: SIZE;
  children?: string | Block;
  onClick?: EventCallback;
}
