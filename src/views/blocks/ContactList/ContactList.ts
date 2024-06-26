import Block from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { Callback } from '@/utils/types';
import { IChat } from '@/utils/interfaces';
import { Contact } from '@/views/blocks/Contact';

import { ContactListProps } from './interfaces/ContactListProps';

class ContactList extends Block {
  constructor(props: ContactListProps) {
    super(props, 'ul');
  }

  private createContacts(): Block[] | undefined {
    const chats: IChat[] = (this.props.chats as Record<string, []>)?.list;

    if (!chats) {
      return undefined;
    }

    return chats.map(
      (chat) =>
        new Contact({
          attributes: { class: 'contacts__item' },
          ...chat,
          onClick: (chatId: number): Promise<void> => this.handleActiveChatChange(chatId),
        })
    );
  }

  private async handleActiveChatChange(chatId: number): Promise<void> {
    if (chatId && chatId !== this.props.activeChatId) {
      (this.props.onChatSelect as Callback)(chatId);
      this.childItems?.contacts?.forEach((contact) => (contact as Contact).updateActiveClass());
    }
  }

  private updateContacts(): void {
    this.childItems.contacts = this.createContacts() as Block[];
  }

  public filterContacts(value: string): void {
    this.childItems.contacts?.forEach((contact) => {
      const contactElement = contact.element;
      const contactName = contactElement?.querySelector('.contact__title')?.textContent;

      if (contactName?.toLowerCase().includes(value.toLowerCase())) {
        contactElement?.classList.remove('visually-hidden');
      } else {
        contactElement?.classList.add('visually-hidden');
      }
    });
  }

  public componentDidUpdate(oldProps: ContactListProps, newProps: ContactListProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.updateContacts();
    }

    return true;
  }

  public async componentDidMount(): Promise<void> {
    this.setProps({
      contacts: this.createContacts(),
    });
  }

  public render(): DocumentFragment {
    if (this.props.isChatListLoading) {
      return this.compile('');
    }

    return this.compile('{{{ contacts }}}');
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isChatListLoading, chats, chatUsers, activeChatId }: IStore) => ({
  isChatListLoading,
  activeChatId,
  chats: { list: chats },
  users: { list: chatUsers },
});

export default connect(mapStateToProps)(ContactList);
