import Block, { Props } from '@/core/Block.ts';
import ChatService from '@/services/ChatService';
import { Sidebar } from '@/views/blocks/Sidebar';
import { Chat } from '@/views/blocks/Chat';
import { ContactPanel } from '@/views/blocks/ContactPanel';

import tpl from './tpl.ts';

class Messenger extends Block {
  constructor(props: Props) {
    super({...props, attributes: { class: 'page page_inner' }});
    this.setProps({
      sidebar: new Sidebar({
        isMessenger: true,
        isSettings: false,
      }),
      chat: new Chat({
        attributes: { class: 'chat' },
      }),
      contactPanel: new ContactPanel({
        attributes: { class: 'contacts panel' },
        onChatSelect: (chatId: number): Promise<void> => this.handleChatSelect(chatId),
      }),
    });
  }

  private async handleChatSelect(chatId: number): Promise<void> {
    if (chatId) {
      try {
        await ChatService.setActiveChat(chatId);
      } catch (error: unknown) {
        console.error(error);
      }
    }
  }

  public async componentDidMount(): Promise<void> {
    try {
      await ChatService.getChats();
    } catch (error: unknown) {
      console.error(error);
    }
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}
export default Messenger;
