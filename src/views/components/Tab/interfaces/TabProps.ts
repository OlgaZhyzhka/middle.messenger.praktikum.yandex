import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface TabProps extends Props {
  title: string;
  index: number;
  onClick?: Callback;
}
