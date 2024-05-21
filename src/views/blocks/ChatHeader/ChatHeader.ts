import Block from '@/core/Block';
import { Callback } from '@/utils/types';
import { contactsMap } from '@/utils/constants.ts';
import { Dropdown } from '@/views/components/Dropdown';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';
import { Avatar } from '@/views/components/Avatar';

import { ChatHeaderProps } from './interfaces/ChatHeaderProps';
import tpl from './tpl';

class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super(props);
    const dropdownChatGroupItems: DropdownItemProps[] = [
      {
        title: 'Upload photo',
        iconName: 'media',
        onClick: (): void => {
          (this.props.onShowModalUploadAvatar as Callback)?.();
        },
      },
      {
        title: 'Add user',
        iconName: 'add-user',
        onClick: (): void => {
          (this.props.onShowModalAddUser as Callback)?.();
        },
      },
      {
        title: 'Delete user',
        iconName: 'delete-user',
        onClick: (): void => {
          (this.props.onShowModalDeleteUser as Callback)?.();
        },
      },
      {
        title: 'Delete chat',
        iconName: 'delete',
        onClick: (): void => {
          (this.props.onShowModalDeleteChat as Callback)?.();
        },
      },
    ];

    const opponent = contactsMap.get(this.props.opponentId as string);

    this.setProps({
      attributes: { class: 'chat__header' },
      dropdown: new Dropdown({
        type: 'top',
        buttonType: 'option',
        items: dropdownChatGroupItems,
      }),
      opponent,
      avatar: new Avatar({ src: opponent?.avatar, title: opponent?.firstName, size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ChatHeader;
