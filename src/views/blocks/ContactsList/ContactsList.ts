import Block from '@/core/Block';
import { IStore } from '@/store';
import { actions } from '@/store/actions';
import connect from '@/helpers/connect';
import { Callback } from '@/utils/types';
import { IChat } from '@/utils/interfaces';
import { Contact } from '@/views/blocks/Contact';

import { ContactsListProps } from './interfaces/ContactsListProps';

class ContactsList extends Block {
  constructor(props: ContactsListProps) {
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
      (this.props.disconnect as Callback)();
      actions.setActiveChatId(chatId);
      this.childItems?.contacts?.forEach((contact) => (contact as Contact).updateActiveClass());
      (this.props.onChatSelect as Callback)(chatId);
    }
  }

  private updateContacts(): void {
    this.childItems.contacts = this.createContacts() as Block[];
  }

  public filterContacts(value: string): void {
    this.childItems.contacts?.forEach((contact) => {
      const contactElement = contact.getContent();
      const contactName = contactElement?.querySelector('.contact__title')?.textContent;

      if (contactName?.toLowerCase().includes(value.toLowerCase())) {
        contactElement?.classList.remove('visually-hidden');
      } else {
        contactElement?.classList.add('visually-hidden');
      }
    });
  }

  public componentDidUpdate(oldProps: ContactsListProps, newProps: ContactsListProps): boolean {
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

export default connect(mapStateToProps)(ContactsList);
