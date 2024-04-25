import Block from '@/core/Block';
import { LabelProps } from './interfaces/LabelProps';


class Label extends Block {
  constructor(props: LabelProps) {
    super(
      {
        ...props,
        attributes: {
          ...props.attributes,
          class: `${props.attributes?.class || ''} label`.trim(),
          for: props.for ? props.for : '',
        },
      },
      'label'
    );
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ children }}}`);
  }
}

export default Label;
