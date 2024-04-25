import Block from '@/core/Block';
import { DropdownItem } from '@/views/components/DropdownItem';
import { Button } from '@/views/components/Button';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';
import { DropdownProps } from './interfaces/DropdownProps';
import tpl from './tpl';

class Dropdown extends Block {
  constructor(props: DropdownProps) {
    super(props);
    const { type } = props;
    const typeClass = type ? `dropdown_${type}` : '';
    const className = `dropdown ${typeClass}`.trim();
    this.setProps({
      attributes: { class: `${className}`.trim() },
      isOpen: false,
      dropdownList: (props.items).map(
        (item: DropdownItemProps) =>
          new DropdownItem({
            ...item,
            onToggle: (): void => this.onToggle(),
          })
      ),
      button: new Button({
        attributes: {
          class: props.buttonType ? `dropdown__button dropdown__button_${props.buttonType}` : 'dropdown__button',
        },
        onClick: this.onToggle.bind(this),
        children: `<span></span>`,
      }),
    });
  }

  private onToggle(): void {
    this.setProps({
      isOpen: !this.props.isOpen,
    });
  }

  public closeDropdown(): void {
    this.setProps({
      isOpen: false,
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Dropdown;
