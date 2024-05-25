import Block from '@/core/Block';
import router from '@/router/Router';

import { RouterLinkProps } from './interfaces/RouterLinkProps';


class RouterLink extends Block {
  constructor(props: RouterLinkProps, tagname = 'a') {
    super(props, tagname);
    const { shape, variant, size } = this.props;
    let className = '';

    if (shape || variant || size) {
      const sizeClass = size ? `button_${size}` : '';
      const variantClass = variant ? `button_${variant}` : '';
      const shapeClass = shape ? `button_${shape}` : '';
      className = `button ${sizeClass} ${variantClass} ${shapeClass}`;
    } else {
      className = 'link';
    }

    this.setProps({
      attributes: {
        class: `${this.props.attributes?.class || ''} ${className}`.trim(),
        href: this.props.to as string,
      },
      events: {
        click: (event: Event): void => this.handleClick(event),
      },
    });
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
