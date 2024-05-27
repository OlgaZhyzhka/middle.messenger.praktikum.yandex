import Block, { Props } from '@/core/Block';
import { Icon } from '@/views/components/Icon';

import tpl from './tpl';

class MessageElement extends Block {
  constructor(props: Props) {
    super(props, 'li');
    this.setProps({
      attributes: {
        class: `${this.props.attributes?.class || ''} chat__item`.trim(),
      },
      icon: new Icon({ iconName: 'read', size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default MessageElement;
