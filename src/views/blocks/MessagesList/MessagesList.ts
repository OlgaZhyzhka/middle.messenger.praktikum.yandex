import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { IMessage } from '@/utils/interfaces';
import { MessageElement } from '@/views/blocks/MessageElement';

class MessagesList extends Block {
  constructor(props: Props) {
    super(props, 'ul');
  }

  private createMessagesList(): Block[] | null {
    const messageList: IMessage[] = (this.props.messages as Record<string, []>)?.list;
    if (!messageList) {
      return null;
    }

    return messageList.map((message) => {
      const messageClass = message.user_id === this.props.userId ? 'chat__item_out' : 'chat__item_in';
      return new MessageElement({ attributes: { class: messageClass }, ...message });
    });
  }

  private scrollToBottom(): void {
    const messagesElement = this.element;
    const lastMessageElement = messagesElement?.lastChild;

    if (lastMessageElement instanceof HTMLElement) {
      lastMessageElement.scrollIntoView();
    }
  }

  private updateMessages(): void {
    this.setProps({
      chatMessages: this.createMessagesList(),
    });
    setTimeout(() => {this.scrollToBottom()}, 0);
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.messages !== newProps.messages) {
      this.updateMessages();
    }

    return true;
  }

  public render(): DocumentFragment {
    if (this.props.isChatLogLoading) {
      return this.compile('');
    }

    return this.compile('{{{ chatMessages }}}');
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isChatLogLoading, user, messages }: IStore) => ({
  isChatLogLoading,
  userId: user?.id,
  messages: { list: messages },
});

export default connect(mapStateToProps)(MessagesList);
