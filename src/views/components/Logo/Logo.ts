import Block from '@/core/Block';
import tpl from './tpl';

class Logo extends Block {

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Logo;
