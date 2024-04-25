import { Props } from '@/core/Block';
import { SIZE } from '@/utils/types';

export interface AvatarProps extends Props {
  size?: SIZE;
  onClick?(event: Event): void;
}
