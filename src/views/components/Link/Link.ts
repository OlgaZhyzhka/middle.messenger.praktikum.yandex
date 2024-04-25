import Block from '@/core/Block';
import { LinkProps } from './interfaces/LinkProps';


class Link extends Block {
  constructor(props: LinkProps) {
    super(props, 'a');
  }

  public render(): DocumentFragment {
    return this.compile(`{{ text }}`);
  }
}

export default Link;
