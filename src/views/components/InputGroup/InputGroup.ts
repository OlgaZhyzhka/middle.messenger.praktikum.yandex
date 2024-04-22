import Block from '@/core/Block';

class InputGroup extends Block {

  public render(): DocumentFragment {
     this.props = {
       ...this.props,
       attributes: {
         ...this.props.attributes,
         class: `${this.props.attributes?.class || ''} input-group`.trim(),
       },
     };
    return this.compile(`{{{ items }}}`);
  }
}

export default InputGroup;
