import Block, { Props } from '@/core/Block';
import { Callback } from '@/utils/types';
import { Button } from '@/views/components/Button';

import tpl from './tpl';

class ModalConfirm extends Block {
  constructor(props: Props) {
    super(
      {
        ...props,
        attributes: { class: 'form form_horizontal' },
        submitButton: new Button({
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
        }),
        cancelButton: new Button({
          size: 'md',
          variant: 'primary-bordered',
          shape: 'rounded',
          children: 'Cancel',
          onClick: (event: Event): void => {
            event.preventDefault();
            (this.props.onCancel as Callback)();
          },
        }),
      },
      'form'
    );
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ModalConfirm;
