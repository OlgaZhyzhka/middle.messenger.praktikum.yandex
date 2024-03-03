import { BasePage } from '@/views/pages/BasePage';
import tpl from './tpl.ts';

class Error500 extends BasePage {
  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Error500;
