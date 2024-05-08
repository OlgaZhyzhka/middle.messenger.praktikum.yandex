import Block, { Props } from '@/core/Block';

class Icon extends Block {
  constructor(props: Props) {
    const { iconName, size } = props;
    const nameClass = iconName ? `icon_${iconName}` : '';
    const sizeClass = size ? `icon_${size}` : '';
    const className = `icon icon_base ${nameClass} ${sizeClass}`;
    super(props, 'i');
    this.setProps({
      attributes: {
        class: `${className}`.trim(),
      },
    });
  }

  public setIconName(iconName: string): void {
    this.setProps({
      iconName,
    });

    const nameClass = iconName ? `icon_${iconName}` : '';
    const sizeClass = this.props.size ? `icon_${this.props.size}` : '';
    const className = `icon icon_base ${nameClass} ${sizeClass}`;

    this._element?.setAttribute('class', `${className}`.trim());
  }

  public render(): DocumentFragment {
    return this.compile('');
  }
}

export default Icon;
