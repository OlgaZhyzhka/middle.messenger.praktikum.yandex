import Block from '@/core/Block';
import { Button } from '@/views/components/Button';
import { Callback } from '@/utils/types';
import { ModalProps } from './interfaces/ModalProps';
import tpl from './tpl';

class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
    const { size } = props;

    const sizeClass = size ? `modal_${size}` : '';
    const className = `modal ${sizeClass}`.trim();

    this.setProps({
      attributes: {
        ...props.attributes,
        class: `${props.attributes?.class || ''} ${className}`.trim(),
      },
      isOpen: false,
      buttonClose: new Button({
        attributes: { class: 'modal__close' },
        onClick: (event: Event): void => this.handleClose(event),
      }),
      modalBg: new Block({
        attributes: { class: 'modal__bg' },
        events: {
          click: (event: Event): void => this.handleClose(event),
        },
      }),
      onClose: (event: Event): void => this.handleClose(event),
    });
  }

  private handleClose(event: Event): void {
    event.preventDefault();
    this.setProps({
      isOpen: false,
      class: `${this.props.attributes?.class || ''} modal`.trim(),
    });
    (this.props.onClose as Callback)?.();
  }

  private handleOpen(): void {
    this.setProps({
      attributes: { class: `${this.props.attributes?.class || ''} modal_open` },
      isOpen: true,
    });
    (this.props.onOpen as Callback)?.();
  }

  public render(): DocumentFragment {
    if (this.handleOpen) {
      this.handleOpen();
    }

    return this.compile(tpl);
  }
}

export default Modal;
