import Block, { Props } from '@/core/Block.ts';
import { Sidebar } from '@/views/blocks/Sidebar';
import { Chat } from '@/views/blocks/Chat';

import { ContactsPanel } from '@/views/blocks/ContactsPanel';
import tpl from './tpl.ts';

class Messenger extends Block {
  constructor(props: Props) {
    super({
      ...props,
      attributes: { class: 'page page_inner' },
      sidebar: new Sidebar({
        isMessenger: true,
        isSettings: false,
      }),
      contactsPanel: new ContactsPanel({ attributes: { class: 'contacts panel' } }),
      chat: new Chat({
        attributes: { class: 'chat' },
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Messenger;
