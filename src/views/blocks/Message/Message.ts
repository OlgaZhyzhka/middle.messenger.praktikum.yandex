import Block from '@/core/Block';
import { Icon } from '@/views/components/Icon';
import { MessageProps } from './interfaces/MessageProps';
import tpl from './tpl';

class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
    const { type } = props;
    const typeClass = type ? `message_${type}` : '';
    const className = `message ${typeClass}`.trim();
    this.setProps({
      attributes: {
        class: `${className}`.trim(),
      },
      icon: new Icon({ iconName: 'read', size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Message;
