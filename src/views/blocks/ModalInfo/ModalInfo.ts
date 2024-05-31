import Block from '@/core/Block';

import tpl from './tpl';

class ModalInfo extends Block {

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ModalInfo;
