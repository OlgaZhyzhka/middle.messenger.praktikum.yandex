import Block from '@/core/Block';

import { AvatarProps } from './interfaces/AvatarProps';
import tpl from './tpl';

class Avatar extends Block {
  constructor(props: AvatarProps) {
    const { size } = props;
    const sizeClass = size ? `avatar_${size}` : '';
    const className = `avatar ${sizeClass}`;

    super({
      ...props,
      attributes: {
        ...props.attributes,
        class: `${props.attributes?.class || ''} ${className}`.trim(),
      },
      events: {
        click: props.onClick || ((): void => {}),
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Avatar;
