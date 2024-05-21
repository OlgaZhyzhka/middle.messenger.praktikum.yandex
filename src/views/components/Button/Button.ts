import Block from '@/core/Block';

import { ButtonProps } from './interfaces/ButtonProps';

class Button extends Block {
  constructor(props: ButtonProps, tagName: string = 'button') {
    super(props, tagName);
    const { shape, variant, size } = this.props;
    const sizeClass = size ? `button_${size}` : '';
    const variantClass = variant ? `button_${variant}` : '';
    const shapeClass = shape ? `button_${shape}` : '';
    const className = `button ${sizeClass} ${variantClass} ${shapeClass}`;
    this.setProps({
      attributes: {
        class: `${this.props.attributes?.class || ''} ${className}`.trim(),
      },
      events: {
        click: props?.onClick || ((): void => {}),
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(`{{{children}}}`);
  }
}

export default Button;
