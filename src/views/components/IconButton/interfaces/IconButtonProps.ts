import { Props } from '@/core/Block';

export interface IconButtonProps extends Props {
  onClick?(event: Event): void;
}
