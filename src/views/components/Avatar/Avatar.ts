import Block, { Props } from '@/core/Block';
import { SIZE } from '@/utils/types';
import tpl from './tpl';

interface AvatarProps extends Props {
  size?: SIZE;
  onClick?(event: Event): void;
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(
      {
        ...props,
        events: {
          click: props.onClick || ((): void => {}),
        },
      });
  }

  public render(): DocumentFragment {
    const { size } = this.props;
    const sizeClass = size ? `avatar_${size}` : '';
    const className = `avatar ${sizeClass}`;
    this.props = {
      ...this.props,
      attributes: {
        ...this.props.attributes,
        class: `${this.props.attributes?.class || ''} ${className}`.trim(),
      },
    };
    return this.compile(tpl);
  }
}

export default Avatar;
