import Block from '@/core/Block';
import { AvatarProps } from './interfaces/AvatarProps';
import tpl from './tpl';

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
    const { size } = this.props;
    const sizeClass = size ? `avatar_${size}` : '';
    const className = `avatar ${sizeClass}`;
    this.setProps({
      attributes: {
        ...this.props.attributes,
        class: `${this.props.attributes?.class || ''} ${className}`.trim(),
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
