import Block, { Props } from '@/core/Block';
import { Search } from '@/views/blocks/Search';
import { ContactsList } from '@/views/blocks/ContactsList';

import tpl from './tpl';

class ContactsPanel extends Block {
  constructor(props: Props) {
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
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ContactsPanel;
