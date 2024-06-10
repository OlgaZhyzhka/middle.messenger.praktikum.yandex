import Block, { Props } from '@/core/Block';
import tpl from './tpl';

class ErrorText extends Block {
  constructor(props: Props) {
    super(props, 'span');
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ErrorText;
