import Block, { Props } from '@/core/Block';
import { contacts } from '@/utils/constants';
import { Contact } from '@/views/blocks/Contact';

import tpl from './tpl';

class ContactsList extends Block {
  constructor(props: Props) {
    super(props, 'ul');
    this.setProps({
      contacts: this.createContacts(),
    });
  }

  private createContacts(): Block[] {
    return contacts.map((contact) => new Contact({ attributes: { class: 'contacts__item' }, ...contact }));
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ContactsList;
