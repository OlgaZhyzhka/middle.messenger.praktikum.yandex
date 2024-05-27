import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { IMessage } from '@/utils/interfaces';
import { MessageElement } from '@/views/blocks/MessageElement';

import tpl from './tpl';

class MessagesList extends Block {
  constructor(props: Props) {
    super(props, 'ul');
    const messageList: IMessage[] = (this.props.messages as Record<string, []>)?.list;
    this.setProps({
      chatMessages: this.createMessagesList(messageList),
    });
  }

  private createMessagesList(messageList: IMessage[]): Block[] | null {
    if (!messageList || !messageList.length) {
      return null;
    }

    return messageList.map((message) => {
      const messageClass = message.user_id === this.props.userId ? 'chat__item_out' : 'chat__item_in';
      return new MessageElement({ attributes: { class: messageClass }, ...message });
    });
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.messages !== newProps.messages) {
      const messageList: IMessage[] = (newProps.messages as Record<string, []>)?.list;
      this.setProps({
        chatMessages: this.createMessagesList(messageList),
      });

      const messagesElement = this.getContent();
      const lastMessageElement = messagesElement?.lastChild;
      if (lastMessageElement instanceof HTMLElement) {
        lastMessageElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    return true;
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ user, messages }: IStore) => ({
  userId: user?.id,
  messages: { list: messages },
});

export default connect(mapStateToProps)(MessagesList);
