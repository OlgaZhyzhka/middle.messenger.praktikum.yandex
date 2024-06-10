import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { IChat } from '@/utils/interfaces';
import { Contact } from '@/views/blocks/Contact';

import tpl from './tpl';

class ContactsList extends Block {
  constructor(props: Props) {
    super(props, 'ul');
    this.setProps({
      contacts: this.createContacts(),
    });
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.setProps({ contacts: this.createContacts() });
    }
    return true;
  }

  private createContacts(): Block[] | undefined {
    const chats: IChat[] = (this.props.chats as Record<string, []>)?.list;

    if (!chats) {
      return undefined;
    }

    return chats.map((chat) => new Contact({ attributes: { class: 'contacts__item' }, ...chat }));
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isLoading, chats, activeChatId }: IStore) => ({
  isLoading,
  activeChatId,
  chats: { list: chats },
});

export default connect(mapStateToProps)(ContactsList);
