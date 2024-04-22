import Block, { Props } from '@/core/Block';
import { currentUser } from '@/utils/constants.ts';
import { Dropdown } from '@/views/components/Dropdown';
import { Avatar } from '@/views/components/Avatar';
import tpl from './tpl';

class ChatHeader extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'chat__header' },
      dropdown: new Dropdown({}),
      title: currentUser.name,
      avatar: new Avatar({ src: currentUser.avatar, title: currentUser.name, size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ChatHeader;
