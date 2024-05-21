import { Props } from '@/core/Block';
import { SIZE, VARIANT, SHAPE, Callback } from '@/utils/types';

export interface RouterLinkProps extends Props {
  to: string;
  children: string;
  variant?: VARIANT;
  shape?: SHAPE;
  size?: SIZE;
  onClick?: Callback;
}
