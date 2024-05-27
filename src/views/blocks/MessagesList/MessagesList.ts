import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { IMessage } from '@/utils/interfaces';
import { MessageElement } from '@/views/blocks/MessageElement';

import tpl from './tpl';

class MessagesList extends Block {
  constructor(props: Props) {
    super(props, 'ul');
    this.setProps({
      chatMessages: this.createMessagesList(),
    });
  }

  private createMessagesList(): Block[] | undefined {
    const messageList: IMessage[] = (this.props.messages as Record<string, []>)?.list;

    if (!messageList || !messageList.length) {
      return undefined;
    }

    return messageList.map((message) => {
      const messageClass = message.user_id === this.props.userId ? 'chat__item_out' : 'chat__item_in';
      return new MessageElement({ attributes: { class: messageClass }, ...message });
    });
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.messages !== newProps.messages) {
      this.setProps({
        chatMessages: this.createMessagesList(),
      });
    }

    return true;
  }

  public render(): DocumentFragment {
    if (this.props.isChatLogLoading) {
      return this.compile('');
    }

    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isChatLogLoading, user, messages }: IStore) => ({
  isChatLogLoading,
  userId: user?.id,
  messages: { list: messages },
});

export default connect(mapStateToProps)(MessagesList);
