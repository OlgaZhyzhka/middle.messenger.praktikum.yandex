import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import { actions } from '@/store/actions';
import connect from '@/helpers/connect';
import { holder } from '@/utils/constants';
import { Callback } from '@/utils/types';
import { Dropdown } from '@/views/components/Dropdown';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';
import { Avatar } from '@/views/components/Avatar';
import { Button } from '@/views/components/Button';

import tpl from './tpl';

class ChatHeader extends Block {
  constructor(props: Props) {
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
    super({
      ...props,
      attributes: { class: 'chat__header' },
      dropdown: new Dropdown({
        type: 'top',
        buttonType: 'option',
        items: { list: dropdownChatGroupItems },
      }),
      avatar: new Avatar({
        attributes: { class: 'chat__header-avatar' },
        size: 'sm',
      }),
      buttonBack: new Button({
        attributes: { class: 'chat__button-back' },
        size: 'sm',
        variant: 'link',
        children: 'Back',
        onClick: (event: Event): void => this.goBack(event),
      }),
    });

    this.setChatHeaderData();
  }

  private goBack(event: Event): void {
    event.preventDefault();
    actions.setActiveChatId(null);
  }

  private setChatHeaderData(): void {
    const chats = actions.getChats();
    const chatItem = chats?.find((chat) => chat.id === this.props.activeChatId);

    if (!chatItem) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { avatar, title, created_by } = chatItem;
    this.setProps({
      title,
    });
    const avatarElement = this.children.avatar as Avatar;
    avatarElement.setProps({
      src: avatar ? `${RESOURCE_URL}${avatar}` : holder,
      alt: title,
    });
    const currentUser = actions.getUser();

    if (currentUser?.id === created_by) {
      this.setProps({
        showControls: true,
      });
    } else {
      this.setProps({
        showControls: false,
      });
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.activeChatId !== newProps.activeChatId) {
      this.setChatHeaderData();
    }

    return true;
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ activeChatId }: IStore) => ({
  activeChatId,
});

export default connect(mapStateToProps)(ChatHeader);
