import { BasePage } from '@/views/pages/BasePage';

import tpl from './tpl.ts';

class Error404 extends BasePage {
  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Error404;
