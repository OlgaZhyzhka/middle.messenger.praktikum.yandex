import Block, { Props } from '@/core/Block';
import { TabProps } from '@/views/components/Tab/interfaces/TabProps';

export interface TabsProps extends Props {
  items: Record<string, TabProps[]>;
  onClick?(index: number): void;
  onChange: (activeTab: number) => Block;
}
