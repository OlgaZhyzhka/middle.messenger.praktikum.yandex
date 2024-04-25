import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface DropdownItemProps extends Props {
  iconName: string;
  title: string;
  inputId?: string;
  onClick?: Callback;
  onToggle?: Callback;
}
