import Block, { Props } from '@/core/Block';
import { SIZE, VARIANT, SHAPE } from '@/types/types';

interface ButtonProps extends Props {
  variant?: VARIANT;
  shape?: SHAPE;
  size?: SIZE;
  children?: string;
  onClick?(event: Event): void;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick || (():void => {}),
      },
    });
  }

  public render(): DocumentFragment {
    const sizeClass = `button_${this.props.size || ''}`;
    const variantClass = `button_${this.props.variant || ''}`;
    const shapeClass = `button_${this.props.shape || ''}`;
    const className = `button ${sizeClass} ${variantClass} ${shapeClass}`;
    return this.compile(`<button type="${this.props.type}" class="${className}">{{{children}}}</button>`);
  }
}

export default Button;
