import Block, { Props } from '@/core/Block';

interface ILinkProps extends Props {
  text: string;
}

class Link extends Block {
  constructor(props: ILinkProps) {
    super(props, 'a');
  }

  public render(): DocumentFragment {
    return this.compile(`{{ text }}`);
  }
}

export default Link;
