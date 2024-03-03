import Block from '@/core/Block';
import tpl from './tpl';


class Input extends Block {

  public render(): DocumentFragment {
    const sizeClass = `ui-input_${this.props.size || ''}`;
    const className = `ui-input ${sizeClass}`;
    const combinedProps = { ...this.props, className };
    return this.compile(tpl, combinedProps);
  }
}

export default Input;
