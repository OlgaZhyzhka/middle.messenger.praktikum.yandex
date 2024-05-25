import Block, { Props } from '@/core/Block.ts';
import ChatService from '@/services/ChatService';
import { Sidebar } from '@/views/blocks/Sidebar';
import { Chat } from '@/views/blocks/Chat';
import { ContactsPanel } from '@/views/blocks/ContactsPanel';

import tpl from './tpl.ts';
import { actions } from '@/store/actions.ts';

class Messenger extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'page page_inner' },
      sidebar: new Sidebar({
        isMessenger: true,
        isSettings: false,
      }),
      contactsPanel: new ContactsPanel({ attributes: { class: 'contacts panel' } }),
      chat: new Chat({
        attributes: { class: 'chat' },
        isLoading: false,
      }),
    });
  }

  public async componentDidMount(): Promise<void> {
    await ChatService.getChats();
    const chats = actions.getChats();

    if (chats?.length === 0) {
      await ChatService.createChat('Default Chat');
    }

    const activeChatId = actions.geActiveChatId();
    const userId = actions.getUser()?.id;
    if (activeChatId && userId) {
      await ChatService.connectToChat(userId, activeChatId);
      ChatService.getOldMessages();
    }
  }

  public componentWillUnmount(): void {
    ChatService.disconnect();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Messenger;
