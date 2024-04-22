import Block, { Props } from '@/core/Block';
import { Icon } from '@/views/components/Icon ';

interface IconButtonProps extends Props {
  onClick?(event: Event): void;
}

class IconButton extends Block {
  public getIcon(): Icon {
    return this.children.icon as Icon;
  }

  constructor(props: IconButtonProps) {
    const { iconSize, iconName } = props;
    super(
      {
        ...props,
        attributes: {
          class: `${props.attributes?.class || ''} button button_icon`,
        },
        icon: new Icon({ name: iconName, size: iconSize }),
        events: {
          click: props.onClick || ((): void => {}),
        },
      },
      'button'
    );
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ icon }}}`);
  }
}

export default IconButton;
