import Block, { Props } from '@/core/Block';
import { Input } from '@/views/components/Input';
import { IconButton } from '@/views/components/IconButton';
import { Dropdown } from '@/views/components/Dropdown';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';

import tpl from './tpl';

class ChatInput extends Block {
  constructor(props: Props) {
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
      chatInput: new Input({
        size: 'sm',
        attributes: { type: 'text', placeholder: 'Type message...', class: 'chat__input' },
        onInput: (): void => this.handleInput(),
      }),
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

  private handleInput(): void {
    const input = (this.getChild('chatInput') as Input).element as HTMLInputElement;
    console.log(input.value);
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

  private handleSend(): void {
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ChatInput;
