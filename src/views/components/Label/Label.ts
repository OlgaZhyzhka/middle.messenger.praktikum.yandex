import Block from '@/core/Block';

import { LabelProps } from './interfaces/LabelProps';

class Label extends Block {
  constructor(props: LabelProps) {
    super(props, 'label');
    this.setProps({
      attributes: {
        class: `${props.attributes?.class || ''} label`.trim(),
        for: props.for ? props.for : '',
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ children }}}`);
  }
}

export default Label;
