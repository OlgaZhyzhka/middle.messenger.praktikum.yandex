import Block, { Props } from '@/core/Block';

class BasePage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      attributes: {
        class: 'container container_centered page',
        ...props.attributes,
      },
    });
  }
}

export default BasePage;
