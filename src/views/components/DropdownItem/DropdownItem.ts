import Block from '@/core/Block';
import { Icon } from '@/views/components/Icon';
import { Label } from '@/views/components/Label';

import { DropdownItemProps } from './interfaces/DropdownItemProps';
import tpl from './tpl';

class DropdownItem extends Block {
  constructor(props: DropdownItemProps) {
    const isFileInput = !!props.inputId;
    const { inputId } = props;
    const icon = new Icon({ iconName: props.iconName, size: 'sm' });
    const labelUpload = new Label({
      attributes: { class: 'dropdown__label' },
      for: inputId,
      children: [icon, props.title],
    });
    super(
      {
        ...props,
        attributes: { class: 'dropdown__item' },
        labelUpload,
        isFileInput,
        events: !isFileInput ? {
          click: (event): void => {
            props.onToggle?.(event);
            props.onClick?.(event);
          },
        } : undefined,
        children: [icon, props.title],
      },
      'li'
    );
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default DropdownItem;
