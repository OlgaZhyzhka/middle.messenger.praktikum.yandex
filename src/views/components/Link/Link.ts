import Block from '@/core/Block';

import { LinkProps } from './interfaces/LinkProps';

class Link extends Block {
  constructor(props: LinkProps, tagName: string = 'a') {
    super(
      {
        ...props,
        events: {
          click: props?.onClick || ((): void => {}),
        },
      },
      tagName
    );
  }

  public render(): DocumentFragment {
    return this.compile(`{{ children }}`);
  }
}

export default Link;
