import Block from '@/core/Block';
import { Callback } from '@/utils/types';

import { TabProps } from './interfaces/TabProps';
import tpl from './tpl';

class Tab extends Block {
  constructor(props: TabProps) {
    super(props, 'li');
    this.setProps({
      attributes: { class: 'tabs__link' },
      events: {
        click: (event: Event) => this.onClick(event),
      },
    });
  }

  private onClick(event: Event): void {
    event.preventDefault();
    (this.props.onClick as Callback)?.(this.props.index);
  }

  public toggleActive(active: boolean): void {
    this.setProps({
      attributes: {
        class: `tabs__link ${active ? 'tabs__link_active' : ''}`,
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Tab;
