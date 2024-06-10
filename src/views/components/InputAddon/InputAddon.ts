import Block, { Props } from '@/core/Block';
import { IconButton } from '@/views/components/IconButton';

class InputAddon extends Block {
  constructor(props: Props) {
    const { placement } = props;
    const className = placement ? `input-addon input-addon_${placement}` : 'input-addon';
    super({
      ...props,
      attributes: {
        class: `${props.attributes?.class || ''} ${className}`.trim(),
      },
    });
  }

  public getAddon(): IconButton {
    return this.children.addon as IconButton;
  }

  public render(): DocumentFragment {
    return this.compile(`{{{ addon }}}`);
  }
}

export default InputAddon;
