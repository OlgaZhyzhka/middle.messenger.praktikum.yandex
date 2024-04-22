import Block, { Props } from '@/core/Block';
import { InputProps } from './interfaces/InputProps';


class Input extends Block {
  constructor(props: InputProps & Props) {
    const { size } = props;

    const sizeClass = size ? `input_${size}` : '';
    const className = `input ${sizeClass}`.trim();

    super(
      {
        ...props,
        attributes: {
          ...props.attributes,
          class: `${props.attributes?.class ? props.attributes?.class : ''} ${className}`.trim(),
        },
        events: {
          blur: props.onBlur || ((): void => {}),
          input: props.onInput || ((): void => {}),
        },
      },
      'input'
    );
  }
}

export default Input;