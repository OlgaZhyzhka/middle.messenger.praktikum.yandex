import { Props } from '@/core/Block';
import { EventCallback } from '@/utils/types';

export interface LinkProps extends Props {
  children: string;
  onClick?: EventCallback;
}
