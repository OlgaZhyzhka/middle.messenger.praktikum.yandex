import Block, { Props } from '@/core/Block';
import { chatMessages } from '@/utils/constants';
import { MessageListItem } from '@/views/blocks/MessageListItem';

import tpl from './tpl';

class MessagesList extends Block {
  constructor(props: Props) {
    super(props, 'ul');
    this.setProps({
      chatMessages: this.createMessagesList(),
    });
  }

  private createMessagesList(): Block[] {
    return chatMessages.map(
      (message) =>
        new MessageListItem({
          messageProps: { ...message },
          attributes: { class: message.incoming ? 'chat__item chat__item_in' : 'chat__item chat__item_out' },
        })
    );
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default MessagesList;
