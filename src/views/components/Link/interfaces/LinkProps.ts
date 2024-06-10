import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface LinkProps extends Props {
  children: string;
  onClick?: Callback;
}
