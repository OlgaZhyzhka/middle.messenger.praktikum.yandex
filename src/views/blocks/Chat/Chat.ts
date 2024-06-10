import Block, { Props } from '@/core/Block';
import ChatService from '@/services/ChatService';
import UserService from '@/services/UserService';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { ChatHeader } from '@/views/blocks/ChatHeader';
import { MessagesList } from '@/views/blocks/MessagesList';
import { ChatInput } from '@/views/blocks/ChatInput';
import { ModalUserForm } from '@/views/blocks/ModalUserForm';
import { Modal } from '@/views/components/Modal';
import { ModalUploadAvatar } from '@/views/blocks/ModalUploadAvatar';
import { Button } from '@/views/components/Button';
import { ModalChat } from '@/views/blocks/ModalChat';
import { ModalConfirm } from '@/views/blocks/ModalConfirm';

import tpl from './tpl';

class Chat extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'chat' },
      chatHeader: this.createChatHeader(),
      chatLog: this.createChatLog(),
      chatInput: this.createChatInput(),
      chatButton: this.createChatButton(),
      modalAddUser: new Modal({
        content: new ModalUserForm({
          title: 'Add user',
          subTitle: 'Enter user login',
          onSubmit: (data: { login: string }): Promise<void> => this.addUserToChat(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalAddUser as Modal),
        }),
      }),
      modalDeleteUser: new Modal({
        content: new ModalUserForm({
          title: 'Delete user',
          subTitle: 'Enter user login',
          onSubmit: (data: Record<string, string>): Promise<void> => this.deleteUserFromChat(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalDeleteUser as Modal),
        }),
      }),
      modalDeleteChat: new Modal({
        content: new ModalConfirm({
          title: 'Delete chat',
          subTitle: 'Are you sure you want to delete all message history?',
          onSubmit: (): Promise<void> => this.deleteChat(),
          onCancel: (): void => this.handleCloseModal(this.children.modalDeleteChat as Modal),
        }),
      }),
      modalUploadAvatar: new Modal({
        content: new ModalUploadAvatar({
          title: 'Upload avatar',
          onSubmit: (data: File): Promise<void> => this.uploadAvatar(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalUploadAvatar as Modal),
        }),
      }),
      modalCreateChat: new Modal({
        content: new ModalChat({
          title: 'Create chat',
          onSubmit: (data: Record<string, string>): Promise<void> => this.createChat(data),
          onCancel: (): void => this.handleCloseModal(this.children.modalCreateChat as Modal),
        }),
      }),
    });
  }

  private showModalCreateChat(event: Event): void {
    event.preventDefault();
    (this.children.modalCreateChat as Modal)?.open();
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

  private async addUserToChat(data: Record<string, string>): Promise<void> {
    try {
      const user = await UserService.findUser(data.login);

      if (!user?.length) {
        console.log('User not found');
        const modalContent = this.children.modalAddUser.getChild('content') as ModalUserForm;
        modalContent.setProps({ subTitle: 'User not found' });
        return;
      }

      const userId = user[0].id;

      try {
        await ChatService.addUserToChat(this.props.activeChatId as number, userId);
        console.log('User added to chat successfully');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.handleCloseModal(this.children.modalAddUser as Modal);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async createChat(data: Record<string, string>): Promise<void> {
    try {
      await ChatService.createChat(data.title);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.handleCloseModal(this.children.modalCreateChat as Modal);
    }
  }

  private async deleteUserFromChat(data: Record<string, string>): Promise<void> {
    try {
      const user = await UserService.findUser(data.login);

      if (!user?.length) {
        console.log('User not found');
        const modalContent = this.children.modalDeleteUser.getChild('content') as ModalUserForm;
        modalContent.setProps({ subTitle: 'User not found' });
        return;
      }

      const userId = user[0].id;

      try {
        await ChatService.deleteUserFromChat(this.props.activeChatId as number, userId);
        console.log('User deleted from chat successfully');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.handleCloseModal(this.children.modalDeleteUser as Modal);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async deleteChat(): Promise<void> {
    try {
      const chatId = this.props.activeChatId;
      await ChatService.deleteChat(chatId as number);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.handleCloseModal(this.children.modalDeleteChat as Modal);
    }
  }

  private async uploadAvatar(file: File): Promise<void> {
    try {
      console.log(file);
      const chatId = this.props.activeChatId;
      await ChatService.updateChatAvatar(file, chatId as number);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.handleCloseModal(this.children.modalUploadAvatar as Modal);
    }
  }

  private createChatButton(): Button {
    return new Button({
      attributes: { type: 'submit', class: 'chat__add-button' },
      size: 'sm',
      variant: 'primary-bordered',
      shape: 'rounded',
      children: 'Create Chat',
      onClick: (event: Event): void => this.showModalCreateChat(event),
    });
  }

  private createChatHeader(): Block {
    return new ChatHeader({
      attributes: { class: 'chat__header' },
      onShowModalAddUser: (): void => this.showModalAddUser(),
      onShowModalDeleteUser: (): void => this.showModalDeleteUser(),
      onShowModalDeleteChat: (): void => this.showModalDeleteChat(),
      onShowModalUploadAvatar: (): void => this.showModalUploadAvatar(),
    });
  }

  private createChatLog(): Block {
    return new MessagesList({
      attributes: { class: 'chat__list' },
    });
  }

  private createChatInput(): Block {
    return new ChatInput({
      attributes: { class: 'chat__footer' },
      onSendMessage: (message: string): void => this.handleSendMessage(message),
    });
  }

  private handleSendMessage(message: string): void {
    ChatService.sendMessage(message);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ activeChatId }: IStore) => ({
  activeChatId,
});

export default connect(mapStateToProps)(Chat);
