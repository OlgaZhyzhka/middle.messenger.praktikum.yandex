import Block from '@/core/Block';
import { DropdownItem } from '@/views/components/DropdownItem';
import { Button } from '@/views/components/Button';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';

import { DropdownProps } from './interfaces/DropdownProps';
import tpl from './tpl';

class Dropdown extends Block {
  constructor(props: DropdownProps) {
    const { type } = props;
    const typeClass = type ? `dropdown_${type}` : '';
    const className = `dropdown ${typeClass}`.trim();
    super({
      ...props,
      attributes: { class: `${className}`.trim() },
      isOpen: false,
    });
  }

  private onToggle(): void {
    this.setProps({
      isOpen: !this.props.isOpen,
    });
  }

  public componentDidMount(): void {
    const items = (this.props.items as { list: DropdownItemProps[] })?.list;
    this.setProps({
      dropdownList: items?.map(
        (item: DropdownItemProps) =>
          new DropdownItem({
            ...item,
            onToggle: (): void => this.onToggle(),
          })
      ),
      button: new Button({
        attributes: {
          class: this.props.buttonType
            ? `dropdown__button dropdown__button_${this.props.buttonType}`
            : 'dropdown__button',
        },
        children: `<span></span>`,
        onClick: this.onToggle.bind(this),
      }),
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
