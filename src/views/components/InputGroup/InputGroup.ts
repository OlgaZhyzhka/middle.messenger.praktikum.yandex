import Block, { Props } from '@/core/Block';

class InputGroup extends Block {
  constructor(props: Props) {
    super(props, 'i');
    this.setProps({
      attributes: {
        class: `${this.props.attributes?.class || ''} input-group`.trim(),
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ items }}}`);
  }
}

export default InputGroup;
