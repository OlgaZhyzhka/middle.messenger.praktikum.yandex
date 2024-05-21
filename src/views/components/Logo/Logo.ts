import Block, { Props } from '@/core/Block';
import { ROUTES } from '@/utils/enums';
import { logoData } from '@/utils/constants';
import { RouterLink } from '@/views/components/RouterLink';

import tpl from './tpl';

class Logo extends Block {
  constructor(props: Props, tagName: string = 'a') {
    super(props, tagName);

    this.setProps({
      logoLink: new RouterLink({
        children: `
          <img src="${logoData.src}" alt="${logoData.text}" class="logo__image">
          <span class="logo__title">${logoData.text}</span>
        `,
        to: ROUTES.Login,
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Logo;
