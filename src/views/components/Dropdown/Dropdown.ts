import Block, { Props } from '@/core/Block';
import { DropdownItem } from '@/views/components/DropdownItem';
import { Button } from '@/views/components/Button';
import { DropdownItemProps } from '@/views/components/DropdownItem/interfaces/DropdownItemProps';
import { DropdownProps } from './interfaces/DropdownProps';
import tpl from './tpl';

class Dropdown extends Block {
  constructor(props: DropdownProps & Props) {
    super(props);
    this.setProps({
      attributes: { class: 'dropdown' },
      isOpen: false,
      button: new Button({
        class: props.buttonClass,
        onClick: (): void => this.onToggle(),
      }),
      dropdownList: this.createDropdownList(),
    });
  }

  private createDropdownList(): Block[] {
    return (this.props.items as DropdownItemProps[]).map(
      (item) =>
        new DropdownItem({
          ...item,
          onToggle: () => this.onToggle(),
        })
    );
  }

  private onToggle(): void {
    this.setProps({
      isOpen: !this.props.isOpen,
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Dropdown;
