import Block, { Props } from '@/core/Block';
import { Input } from '@/views/components/Input';
import { IconButton } from '@/views/components/IconButton';
import tpl from './tpl';

class ChatInput extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'chat__footer' },
      fileIcon: new IconButton({
        attributes: { class: 'chat__button' },
        iconName: 'attach',
        iconSize: 'sm',
        onClick: (event): void => {
          event.preventDefault();
          this.handleAttachFile();
        },
      }),
      sendIcon: new IconButton({
        attributes: { class: 'chat__button' },
        iconName: 'send',
        iconSize: 'sm',
        onClick: (event): void => {
          event.preventDefault();
          this.handleSend();
        },
      }),
      chatInput: new Input({
        size: 'sm',
        attributes: { type: 'text', placeholder: 'Type message...', class: 'chat__input' },
        onInput: (): void => {
          this.handleInput();
        },
      }),
    });
  }

  private handleInput(): void {
    const input = (this.getChild('chatInput') as Input).element as HTMLInputElement;
    console.log(input.value);
  }

  private handleAttachFile(): void {
    // console.log(value);
  }

  private handleSend(): void {
    // console.log(value);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ChatInput;
