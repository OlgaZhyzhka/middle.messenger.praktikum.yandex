import Block, { Props } from '@/core/Block';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class Contact extends Block {
  constructor(props: Props) {
    super(props, 'li');
    this.setProps({
      attributes: { class: `${props.attributes?.class || ''} contact` },
      avatar: new Avatar({ src: props.avatar, alt: props.name, size: 'sm' }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Contact;
