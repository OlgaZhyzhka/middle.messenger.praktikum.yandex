import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { ChatHeader } from '@/views/blocks/ChatHeader';
import { MessagesList } from '@/views/blocks/MessagesList';
import { ChatInput } from '@/views/blocks/ChatInput';
import { ModalUserForm } from '@/views/blocks/ModalUserForm';
import { Modal } from '@/views/components/Modal';
import { ModalUploadAvatar } from '@/views/blocks/ModalUploadAvatar';

import tpl from './tpl';

class Chat extends Block {
  constructor(props: Props) {
    super(props);
    console.log(this.props.activeChatId);
    this.setProps({
      attributes: { class: 'chat' },
      chatHeader: this.createChatHeader(),
      chatMessages: this.createChatMessages(),
      chatInput: this.createChatInput(),
      modalAddUser: new Modal({
        content: new ModalUserForm({
          title: 'Add user',
          onSubmit: (data: Record<string, string>): void => this.addUserToChat(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalAddUser as Modal),
        }),
      }),
      modalDeleteUser: new Modal({
        content: new ModalUserForm({
          title: 'Delete user',
          onSubmit: (data: Record<string, string>): void => this.deleteUserToChat(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalDeleteUser as Modal),
        }),
      }),
      modalDeleteChat: new Modal({
        content: new ModalUserForm({
          title: 'Delete chat',
          subTitle: 'Are you sure you want to delete all message history?',
          onSubmit: (data: Record<string, string>): void => this.deleteChat(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalDeleteChat as Modal),
        }),
      }),
      modalUploadAvatar: new Modal({
        content: new ModalUploadAvatar({
          title: 'Upload avatar',
          onSubmit: (data: Record<string, string>): void => this.uploadAvatar(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalUploadAvatar as Modal),
        }),
      }),
    });
  }

  private showModalAddUser(): void {
    (this.children.modalAddUser as Modal)?.open();
  }

  private showModalDeleteUser(): void {
    (this.children.modalDeleteUser as Modal)?.open();
  }

  private showModalDeleteChat(): void {
    (this.children.modalDeleteChat as Modal)?.open();
  }

  private showModalUploadAvatar(): void {
    (this.children.modalUploadAvatar as Modal)?.open();
  }

  private handleCloseModal(modal: Modal): void {
    modal.close();
  }

  private addUserToChat(data: Record<string, string>): void {
    // TODO: Отправить данные формы
    console.log(data);
    this.handleCloseModal(this.children.modalAddUser as Modal);
  }

  private deleteUserToChat(data: Record<string, string>): void {
    // TODO: Отправить данные формы
    console.log(data);
    this.handleCloseModal(this.children.modalDeleteUser as Modal);
  }

  private deleteChat(data: Record<string, string>): void {
    // TODO: Отправить данные формы
    console.log(data);
    this.handleCloseModal(this.children.modalDeleteChat as Modal);
  }

  private uploadAvatar(data: Record<string, string>): void {
    console.log(data);
    this.handleCloseModal(this.children.modalUploadAvatar as Modal);
  }

  private createChatHeader(): Block {
    return new ChatHeader({
      attributes: { class: 'chat__header' },
      opponentId: '12121',
      onShowModalAddUser: (): void => this.showModalAddUser(),
      onShowModalDeleteUser: (): void => this.showModalDeleteUser(),
      onShowModalDeleteChat: (): void => this.showModalDeleteChat(),
      onShowModalUploadAvatar: (): void => this.showModalUploadAvatar(),
    });
  }

  private createChatMessages(): Block {
    return new MessagesList({
      attributes: { class: 'chat__list' },
    });
  }

  private createChatInput(): Block {
    return new ChatInput({
      attributes: { class: 'chat__footer' },
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// export default Chat;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ messages, activeChatId }: IStore) => ({
  activeChatId,
  messages,
});

export default connect(mapStateToProps)(Chat);
