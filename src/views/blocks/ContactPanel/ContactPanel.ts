import Block from '@/core/Block';
import { Callback } from '@/utils/types';
import { Search } from '@/views/blocks/Search';
import { ContactList } from '@/views/blocks/ContactList';

import tpl from './tpl';
import { ContactPanelProps } from './interfaces/ContactPanelProps';

class ContactPanel extends Block {
  constructor(props: ContactPanelProps) {
    super({
      ...props,
      search: new Search({
        attributes: { class: 'contacts__search' },
        onSearch: (value: string): void => this.handleSearch(value),
      }),
      contactList: new ContactList({
        attributes: { class: 'contacts__list' },
        onChatSelect: (chatId: number): void => (this.props.onChatSelect as Callback)(chatId),
      }),
    });
  }

  private handleSearch(value: string): void {
    const contactList = this.getChild('contactList');
    contactList?.filterContacts(value);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ContactPanel;
