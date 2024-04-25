import { Props } from '@/core/Block';
import { DropdownItemProps } from "@/views/components/DropdownItem/interfaces/DropdownItemProps";

export interface DropdownProps extends Props {
  type: string;
  items: DropdownItemProps[];
}