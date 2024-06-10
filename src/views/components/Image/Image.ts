import Block, { Props } from '@/core/Block';

class Image extends Block {
  constructor(props: Props) {
    super(props, 'img');
    this.setProps({
      attributes: {
        class: 'image',
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile('');
  }
}

export default Image;
