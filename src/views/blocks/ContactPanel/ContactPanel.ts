import Block from '@/core/Block';
import { Callback } from '@/utils/types';
import { Search } from '@/views/blocks/Search';
import { ContactsList } from '@/views/blocks/ContactsList';

import tpl from './tpl';
import { ContactPanelProps } from './interfaces/ContactPanelProps';

class ContactPanel extends Block {
  constructor(props: ContactPanelProps) {
    super(props);
    this.setProps({
      search: this.createSearch(),
      contactsList: this.createContactsList(),
    });
  }

  private createSearch(): Block {
    return new Search({
      attributes: { class: 'contacts__search' },
    });
  }

  private createContactsList(): Block {
    return new ContactsList({
      attributes: { class: 'contacts__list' },
      onChatSelect: (chatId: number): void => (this.props.onChatSelect as Callback)(chatId),
      disconnect: (): void => (this.props.disconnect as Callback)(),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ContactPanel;