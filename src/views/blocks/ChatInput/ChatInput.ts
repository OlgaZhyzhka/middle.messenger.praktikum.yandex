import Block from '@/core/Block';
import validate from '@/helpers/validators';
import { Input } from '@/views/components/Input';
import { IconButton } from '@/views/components/IconButton';
import { Dropdown } from '@/views/components/Dropdown';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';

import { ChatInputProps } from './interfaces/ChatInputProps';
import tpl from './tpl';

class ChatInput extends Block {
  constructor(props: ChatInputProps) {
    super(props);
    const dropdownUpload: DropdownItemProps[] = [
      {
        title: 'Media',
        iconName: 'media',
        inputId: 'file-input-media',
      },
      {
        title: 'File',
        iconName: 'file',
        inputId: 'file-input-file',
      },
      {
        title: 'Location',
        iconName: 'location',
        inputId: 'file-input-location',
      },
    ];
    this.setProps({
      attributes: { class: 'chat__footer' },
      sendButton: new IconButton({
        attributes: { class: 'chat__button' },
        iconName: 'send',
        iconSize: 'sm',
        onClick: (): void => this.handleSend(),
      }),
      chatInput: this.createMessageInput(),
      dropdown: new Dropdown({
        type: 'bottom',
        buttonType: 'upload',
        items: dropdownUpload,
      }),
      fileInputMedia: new Input({
        attributes: { class: 'input_file', type: 'file', accept: 'image/*, video/*', id: 'file-input-media' },
        onChange: (event: Event): void => this.handleAttachMedia(event),
      }),
      fileInputFile: new Input({
        attributes: { class: 'input_file', type: 'file', style: 'display: none;', id: 'file-input-file' },
        onChange: (event: Event): void => this.handleAttachFile(event),
      }),
    });
  }

  private createInput({ onBlur, attributes = {}, inputAttributes = {} }: InputProps): InputElement {
    return new InputElement({
      size: 'sm',
      isValid: false,
      attributes,
      inputAttributes,
      onBlur,
    });
  }

  private createMessageInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { message: value };
      const validText = validate(data, 'message');
      const input = this.getChild('chatInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      console.log(event.key);
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.handleSend();
      }
    };

    const inputProps = {
      size: 'sm',
      attributes: { type: 'text', placeholder: 'Type message...', class: 'chat__input' },
      onBlur,
      onKeyDown,
    };
    return this.createInput(inputProps);
  }

  private handleAttachFile(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Media file:', file);
      (this.children.dropdown as Dropdown).closeDropdown();
    }
  }

  private handleAttachMedia(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Media file:', file);
      (this.children.dropdown as Dropdown).closeDropdown();
    }
  }

  private checkFormValidity(chatInput: InputElement): boolean {
    let isFormValid = true;

    if (chatInput?.getProps()?.isValid !== true) {
      chatInput?.setErrorMessage('Invalid message');
      isFormValid = false;
    }

    return isFormValid;
  }

  private handleSend(): void {
    const chatInput = this.getChild('chatInput') as InputElement;
    const isFormValid = this.checkFormValidity(chatInput);

    if (!isFormValid) {
      console.error('Invalid input value');
      return;
    }

    const input = chatInput.getInputElement();
    const message = input.value.trim();

    if (message) {
      (this.props as ChatInputProps).onSendMessage(message);
      input.value = '';
    }
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ChatInput;
