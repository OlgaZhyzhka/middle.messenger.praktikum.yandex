import Block from '@/core/Block';
import router from '@/router/Router';

import { RouterLinkProps } from './interfaces/RouterLinkProps';

class RouterLink extends Block {
  constructor(props: RouterLinkProps, tagname = 'a') {
    const { shape, variant, size } = props;
    let className = '';

    if (shape || variant || size) {
      const sizeClass = size ? `button_${size}` : '';
      const variantClass = variant ? `button_${variant}` : '';
      const shapeClass = shape ? `button_${shape}` : '';
      className = `button ${sizeClass} ${variantClass} ${shapeClass}`;
    } else {
      className = 'link';
    }
    super(
      {
        ...props,
        attributes: {
          class: `${props.attributes?.class || ''} ${className}`.trim(),
          href: props.to,
        },
        events: {
          click: (event: Event): void => this.handleClick(event),
        },
      },
      tagname
    );
  }

  private handleClick(event: Event): void {
    event.preventDefault();
    (this.props as RouterLinkProps).onClick?.();
    router.go(this.props.to as string);
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ children }}}`);
  }
}

export default RouterLink;
