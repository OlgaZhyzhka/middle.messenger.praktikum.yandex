import Block from '@/core/Block';
import Router from '@/router/Router';

import { RouterLinkProps } from './interfaces/RouterLinkProps';

const router = Router.getInstance();

class RouterLink extends Block {
  constructor(props: RouterLinkProps, tagname = 'a') {
    super(props, tagname);
    const { shape, variant, size } = this.props;
    const sizeClass = size ? `button_${size}` : '';
    const variantClass = variant ? `button_${variant}` : '';
    const shapeClass = shape ? `button_${shape}` : '';
    const className = `button ${sizeClass} ${variantClass} ${shapeClass}`;

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
