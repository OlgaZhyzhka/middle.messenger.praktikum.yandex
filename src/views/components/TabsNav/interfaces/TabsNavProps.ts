import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';
import { TabProps } from '@/views/components/Tab/interfaces/TabProps';

export interface TabsNavProps extends Props {
  items: TabProps[];
  onClick?: Callback;
}
