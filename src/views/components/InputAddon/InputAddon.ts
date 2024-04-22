import Block from '@/core/Block';
import { IconButton } from '@/views/components/IconButton';

class InputAddon extends Block {
  public getAddon(): IconButton {
    return this.children.addon as IconButton;
  }

  public render(): DocumentFragment {
    const { placement } = this.props;
    const className = placement ? `input-addon input-addon_${placement}` : 'input-addon';

    this.props = {
      ...this.props,
      attributes: {
        ...this.props.attributes,
        class: `${this.props.attributes?.class || ''} ${className}`.trim(),
      },
    };

    return this.compile(`{{{ addon }}}`);
  }
}

export default InputAddon;
