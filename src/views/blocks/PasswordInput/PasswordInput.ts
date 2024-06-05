import Block, { Props } from '@/core/Block';
import { InputAddon } from '@/views/components/InputAddon';
import { IconButton } from '@/views/components/IconButton';
import { InputElement } from '@/views/components/InputElement';

import tpl from './tpl';

class PasswordInput extends Block {
  private isPasswordVisible: boolean;

  constructor(props: Props) {
    super({
      ...props,
      inputAddon: new InputAddon({
        placement: 'right',
        addon: new IconButton({
          iconName: 'eye-close',
          iconSize: 'sm',
          onClick: (event: Event): void => this.toggleVisibility(event),
        }),
      }),
    });
    this.isPasswordVisible = false;
  }

  public toggleVisibility(event: Event): void {
    event.preventDefault();
    this.isPasswordVisible = !this.isPasswordVisible;
    const inputElement = (this.children.inputElement as InputElement).getInputElement();
    inputElement.type = this.isPasswordVisible ? 'text' : 'password';

    if (this.isPasswordVisible) {
      (this.getChild('inputAddon') as InputAddon).getAddon().getIcon().setIconName('eye');
    } else {
      (this.getChild('inputAddon') as InputAddon).getAddon().getIcon().setIconName('eye-close');
    }
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default PasswordInput;
