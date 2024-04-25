import Block, { Props } from '@/core/Block';
import { currentUser } from '@/utils/constants.ts';
import { Dropdown } from '@/views/components/Dropdown';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';
import { Avatar } from '@/views/components/Avatar';
import tpl from './tpl';

class ChatHeader extends Block {
  constructor(props: Props) {
    super(props);
    // const dropdownChatItems: DropdownItemProps[] = [
    //   {
    //     title: 'Delete chat',
    //     iconName: 'delete',
    //     onClick: () => console.log('Delete chat'),
    //     onToggle: () => console.log('Toggle'),
    //   },
    // ];
    const dropdownChatGroupItems: DropdownItemProps[] = [
      {
        title: 'Upload photo',
        iconName: 'media'
      },
      {
        title: 'Add user',
        iconName: 'add-user'
      },
      {
        title: 'Delete user',
        iconName: 'delete-user'
      },
      {
        title: 'Delete chat',
        iconName: 'delete'
      },
    ];
    this.setProps({
      attributes: { class: 'chat__header' },
      dropdown: new Dropdown({
        type: 'top',
        buttonType: 'option',  
        items: dropdownChatGroupItems,
      }),
      title: currentUser.name,
      avatar: new Avatar({ src: currentUser.avatar, title: currentUser.name, size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ChatHeader;
