import Block, { Props } from '@/core/Block.ts';
import ChatService from '@/services/ChatService';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { Sidebar } from '@/views/blocks/Sidebar';
import { Chat } from '@/views/blocks/Chat';
import { ContactsPanel } from '@/views/blocks/ContactsPanel';

import tpl from './tpl.ts';

class Messenger extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'page page_inner' },
      sidebar: new Sidebar({
        isMessenger: true,
        isSettings: false,
      }),
      chat: new Chat({
        attributes: { class: 'chat' },
      }),
      contactsPanel: new ContactsPanel({ attributes: { class: 'contacts panel' } }),
    });
  }


  private async handleActiveChatChange(chatId: number): Promise<void> {
    if (chatId) {
      try {
        await ChatService.setActiveChat(chatId);
      } catch (error: unknown) {
        console.error(error);
      }
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.activeChatId !== newProps.activeChatId) {
      this.handleActiveChatChange(newProps.activeChatId as number);
    }

    return true;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await ChatService.getChats();

      if (this.props.activeChatId) {
        await this.handleActiveChatChange(this.props.activeChatId as number);
      }

    } catch (error: unknown) {
      console.error(error);
    }
  }

  public componentWillUnmount(): void {
    ChatService.disconnect();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isChatListLoading, user, activeChatId }: IStore) => ({
  isChatListLoading,
  userId: user?.id,
  activeChatId,
});

export default connect(mapStateToProps)(Messenger);
