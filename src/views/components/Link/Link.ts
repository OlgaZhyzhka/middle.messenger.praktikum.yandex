import Block, { Props } from '@/core/Block';

interface LinkProps extends Props {
  text: string;
}

class Link extends Block {
  constructor(props: LinkProps) {
    super(props, 'a');
  }

  public render(): DocumentFragment {
    return this.compile(`{{ text }}`);
  }
}

export default Link;
