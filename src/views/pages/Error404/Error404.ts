import { Props } from '@/core/Block.ts';
import { BasePage } from '@/views/pages/BasePage';
import { RouterLink } from '@/views/components/RouterLink';
import { ROUTES } from '@/utils/enums.ts';

import tpl from './tpl.ts';

class Error404 extends BasePage {
  constructor(props: Props) {
    super({
      ...props,
      link: new RouterLink({
        size: 'md',
        variant: 'primary',
        shape: 'rounded',
        children: 'Go to home page',
        to: ROUTES.Home,
      }),
    });
  }
  
  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Error404;
