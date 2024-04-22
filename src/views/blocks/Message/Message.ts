import Block, { Props } from '@/core/Block';
import { Icon } from '@/views/components/Icon ';
import { MessageProps } from './interfaces/MessageProps';
import tpl from './tpl';

class Message extends Block {
  constructor(props: MessageProps & Props) {
    super(props);
    const baseClass = 'message';
    const typeClass = props.type === 'media' ? `${baseClass}_media` : `${baseClass}_base`;
    this.setProps({
      attributes: {
        class: `${baseClass} ${typeClass}`,
      },
      icon: new Icon({ name: 'read', size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Message;
