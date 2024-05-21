import Block from '@/core/Block';
import { Callback } from '@/utils/types';
import { Button } from '@/views/components/Button';

import { ModalProps } from './interfaces/ModalProps';
import tpl from './tpl';

class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
    const { size = 'sm', isOpen } = props;

    const sizeClass = size ? `modal_${size}` : '';
    const openClass = isOpen ? 'modal_open' : '';
    const className = `modal ${sizeClass} ${openClass}`.trim();

    this.setProps({
      attributes: {
        ...props.attributes,
        class: `${props.attributes?.class || ''} ${className}`.trim(),
      },
      buttonClose: new Button({
        attributes: { class: 'modal__close' },
        onClick: (event: Event): void => {
          event.preventDefault();
          this.close();
        },
      }),
      modalBg: new Block({
        attributes: { class: 'modal__bg' },
        events: {
          click: (event: Event): void => {
            event.preventDefault();
            this.close();
          },
        },
      }),
    });
  }

  public close(): void {
    const element = this.getContent();
    element?.classList.remove('modal_open');
    (this.props.onClose as Callback)?.();
  }

  public open(): void {
    const element = this.getContent();
    element?.classList.add('modal_open');
    (this.props.onOpen as Callback)?.();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Modal;
