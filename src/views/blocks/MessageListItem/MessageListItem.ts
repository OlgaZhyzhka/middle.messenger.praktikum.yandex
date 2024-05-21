import Block, { Props } from '@/core/Block';
import { Message } from '@/views/blocks/Message';
import { MessageProps } from '@/views/blocks/Message/interfaces/MessageProps';

import tpl from './tpl';

class MessageListItem extends Block {
  constructor(props: Props) {
    super(props, 'li');
    this.setProps({
      message: new Message(props.messageProps as MessageProps & Props),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default MessageListItem;
