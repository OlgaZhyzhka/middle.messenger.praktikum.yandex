import { Props } from '@/core/Block';
import { TabProps } from '@/views/components/Tab/interfaces/TabProps';

export interface TabsNavProps extends Props {
  items: Record<string, TabProps[]>;
  onClick?(index: number): void;
}
