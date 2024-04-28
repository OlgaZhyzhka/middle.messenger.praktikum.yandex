import Block from '@/core/Block';
import { ButtonProps } from './interfaces/ButtonProps';

class Button extends Block {
  constructor(props: ButtonProps, tagName: string = 'button') {
    super(
      {
        ...props,
        events: {
          click: props?.onClick || ((): void => {}),
        },
      },
      tagName
    );
  }

  public render(): DocumentFragment {
    const { shape, variant, size } = this.props;
    const sizeClass = size ? `button_${size}` : '';
    const variantClass = variant ? `button_${variant}` : '';
    const shapeClass = shape ? `button_${shape}` : '';
    const className = `button ${sizeClass} ${variantClass} ${shapeClass}`;

    this.props = {
      ...this.props,
      attributes: {
        ...this.props.attributes,
        class: `${this.props.attributes?.class || ''} ${className}`.trim(),
      },
    };

    return this.compile(`{{{children}}}`);
  }
}

export default Button;
