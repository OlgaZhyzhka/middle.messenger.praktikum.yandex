import Block, { Props } from '@/core/Block';
import { SIZE, VARIANT, SHAPE } from '@/utils/types';

interface ButtonProps extends Props {
  variant?: VARIANT;
  shape?: SHAPE;
  size?: SIZE;
  children?: string | Block;
  onClick?(event: Event): void;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super(
      {
        ...props,
        events: {
          click: props.onClick || ((): void => {}),
        },
      },
      'button'
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
