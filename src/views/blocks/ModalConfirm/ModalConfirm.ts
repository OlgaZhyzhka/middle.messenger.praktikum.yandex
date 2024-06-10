import Block, { Props } from '@/core/Block';
import { Callback } from '@/utils/types';
import { Button } from '@/views/components/Button';

import tpl from './tpl';

class ModalConfirm extends Block {
  constructor(props: Props) {
    super(props, 'form');
    this.setProps({
      attributes: { class: 'form form_horizontal' },
      submitButton: this.createSubmitButton(),
      cancelButton: this.createCancelButton(),
    });
  }

  private createSubmitButton(): Button {
    return new Button({
      attributes: { type: 'submit' },
      type: 'submit',
      size: 'md',
      variant: 'primary',
      shape: 'rounded',
      children: 'OK',
      onClick: (event: Event): void => {
        event.preventDefault();
        (this.props.onSubmit as Callback)();
      },
    });
  }

  private createCancelButton(): Button {
    return new Button({
      size: 'md',
      variant: 'primary-bordered',
      shape: 'rounded',
      children: 'Cancel',
      onClick: (event: Event): void => {
        event.preventDefault();
        (this.props.onCancel as Callback)();
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ModalConfirm;
