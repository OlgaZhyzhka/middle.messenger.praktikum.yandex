import Block, { Props } from '@/core/Block';

class BasePage extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: {
        class: 'container page',
        ...props.attributes,
      },
    });
  }
}

export default BasePage;
