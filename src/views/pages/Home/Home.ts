import { BasePage } from '@/views/pages/BasePage';

import tpl from './tpl.ts';

class Home extends BasePage {
  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Home;
