import Block, { Props } from '@/core/Block';
import { DropdownItemProps } from './interfaces/DropdownItemProps';
// import tpl from './tpl';

class DropdownItem extends Block {
  constructor(props: DropdownItemProps & Props) {
    super(props, 'li');
    this.setProps({
      attributes: {class: 'dropdown__item'},
      events: {
        click: (event) => {
          props.onToggle(event);
          props.onClick(event);
        },
      },
      children: props.title
    });
  }

  public render(): DocumentFragment {
    return this.compile(`{{{children}}}`);
  }
}

export default DropdownItem;
