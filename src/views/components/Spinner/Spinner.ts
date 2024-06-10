import Block, { Props } from '@/core/Block';

import tpl from './tpl';

class Spinner extends Block {
  constructor(props: Props) {
    super({
      ...props,
      attributes: {
        class: `${props.attributes?.class || ''} spinner`.trim(),
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Spinner;
