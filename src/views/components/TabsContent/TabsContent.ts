import Block from '@/core/Block';
import { TabsContentProps } from './interfaces/TabsContentProps';
import tpl from './tpl';

class TabsContent extends Block {

  constructor(props: TabsContentProps) {
    super(props);
    this.setProps({
      attributes: { class: 'tabs__content' },
      content: props.content,
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default TabsContent;
