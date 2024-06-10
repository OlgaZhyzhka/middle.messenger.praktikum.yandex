import { Props } from '@/core/Block';
import { Callback, SIZE } from '@/utils/types';

export interface AvatarProps extends Props {
  size?: SIZE;
  onClick?: Callback;
}
