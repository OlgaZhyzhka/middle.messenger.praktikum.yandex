import Block, { Props } from '@/core/Block';
import { Callback } from '@/utils/types';
import { TabProps } from '@/views/components/Tab/interfaces/TabProps';

export interface TabsProps extends Props {
  items: TabProps[];
  onClick?: Callback;
  onChange: (activeTab: number) => Block;
}
