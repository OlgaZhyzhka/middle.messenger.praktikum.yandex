import Block from '@/core/Block';

import { InputProps } from './interfaces/InputProps';

class Input extends Block {
  constructor(props: InputProps) {
    const { size } = props;

    const sizeClass = size ? `input_${size}` : '';
    const className = `input ${sizeClass}`.trim();
    super(
      {
        ...props,
        attributes: {
          ...props.attributes,
          class: `${props.attributes?.class || ''} ${className}`.trim(),
        },
        events: {
          blur: props.onBlur || ((): void => {}),
          input: props.onInput || ((): void => {}),
          change: props.onChange || ((): void => {}),
          keydown: props.onKeyDown || ((): void => {}),
        },
      },
      'input'
    );
  }

  public render(): DocumentFragment {
    return this.compile('');
  }
}

export default Input;
