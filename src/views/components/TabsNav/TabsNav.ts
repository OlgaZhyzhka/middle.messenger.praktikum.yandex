import Block from '@/core/Block';
import { Callback } from '@/utils/types';
import { TabProps } from '@/views/components/Tab/interfaces/TabProps';
import { Tab } from '@/views/components/Tab';

import { TabsNavProps } from './interfaces/TabsNavProps';
import tpl from './tpl';

class TabsNav extends Block {
  constructor(props: TabsNavProps) {
    const items = (props.items as { list: TabProps[] })?.list;
    super(
      {
        ...props,
        attributes: { class: 'tabs__nav' },
        tabsNav: items.map(
          (item: TabProps) =>
            new Tab({
              ...item,
              onClick: (index): void => (this.props.onClick as Callback)?.(index),
            })
        ),
      },
      'ul'
    );
  }

  public highlightTab(activeTabIndex: number): void {
    const tabs = this.childItems.tabsNav as Tab[];
    tabs.forEach((tab: Tab) => {
      const { index } = tab.getProps();
      tab.toggleActive(index === activeTabIndex);
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default TabsNav;
