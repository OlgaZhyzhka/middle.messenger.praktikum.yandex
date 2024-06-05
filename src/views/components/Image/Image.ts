import Block, { Props } from '@/core/Block';

class Image extends Block {
  constructor(props: Props) {
    super(
      {
        ...props,
        attributes: {
          class: 'image',
        },
      },
      'img'
    );
  }

  public render(): DocumentFragment {
    return this.compile('');
  }
}

export default Image;
