import Block from '@/core/Block';

import { LinkProps } from './interfaces/LinkProps';

class Link extends Block {
  constructor(props: LinkProps, tagName: string = 'a') {
    super(props, tagName);

    this.setProps({
      events: {
        click: props?.onClick || ((): void => {}),
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(`{{ children }}`);
  }
}

export default Link;
