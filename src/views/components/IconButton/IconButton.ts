import Block from '@/core/Block';
import { Icon } from '@/views/components/Icon';
import { IconButtonProps } from './interfaces/IconButtonProps';


class IconButton extends Block {
  constructor(props: IconButtonProps) {
    const { iconSize, iconName } = props;
    super(props, 'button');
    this.setProps({
      attributes: {
        class: `${props.attributes?.class || ''} button button_icon`,
      },
      icon: new Icon({ iconName, size: iconSize }),
      events: {
        click: props.onClick || ((): void => {}),
      },
    });
  }

  public getIcon(): Icon {
    return this.children.icon as Icon;
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ icon }}}`);
  }
}

export default IconButton;
