import Block from '@/core/Block';
import { Icon } from '@/views/components/Icon';
import { Label } from '@/views/components/Label';
import { DropdownItemProps } from './interfaces/DropdownItemProps';
import tpl from './tpl';

class DropdownItem extends Block {
  constructor(props: DropdownItemProps) {
    super(props, 'li');
    const isFileInput = !!props.inputId;
    const { inputId } = props;
    const icon = new Icon({ name: props.iconName, size: 'sm' });

   if (isFileInput) {
     this.setProps({
       labelUpload: new Label({
         attributes: { class: 'dropdown__label' },
         for: inputId,
         children: [icon, props.title],
       }),
     });
   } else {
     this.setProps({
       events: {
         click: (event) => {
          props.onToggle?.(event);
          props.onClick?.(event);
         },
       },
     });
   }

    this.setProps({
      attributes: { class: 'dropdown__item' },
      children: [icon, props.title],
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default DropdownItem;
