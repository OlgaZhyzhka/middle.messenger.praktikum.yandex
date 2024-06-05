import Block, { Props } from '@/core/Block';

class InputGroup extends Block {
  constructor(props: Props) {
    super(
      {
        ...props,
        attributes: {
          class: `${props.attributes?.class || ''} input-group`.trim(),
        },
      },
      'i'
    );
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ items }}}`);
  }
}

export default InputGroup;
