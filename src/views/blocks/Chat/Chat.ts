import Block, { Props } from '@/core/Block';
import { ChatHeader } from '@/views/blocks/ChatHeader';
import { MessagesList } from '@/views/blocks/MessagesList';
import { ChatInput } from '@/views/blocks/ChatInput';
import tpl from './tpl';

class Chat extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      isLoading: false,
      attributes: { class: 'chat' },
      chatHeader: this.createChatHeader(),
      chatMessages: this.createChatMessages(),
      chatInput: this.createChatInput(),
    });
  }

  private createChatHeader(): Block {
    return new ChatHeader({
      attributes: { class: 'chat__header' },
      avatar: this.props.avatar,
      title: this.props.title || '',
    });
  }

  private createChatMessages(): Block {
    return new MessagesList({
      attributes: { class: 'chat__list' },
    });
  }

  private createChatInput(): Block {
    return new ChatInput({
      attributes: { class: 'chat__footer' },
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Chat;
