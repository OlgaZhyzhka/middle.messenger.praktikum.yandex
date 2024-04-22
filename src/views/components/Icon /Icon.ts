import Block, { Props } from '@/core/Block';

class Icon extends Block {
  constructor(props: Props) {
    const { name, size } = props;
    const nameClass = name ? `icon_${name}` : '';
    const sizeClass = size ? `icon_${size}` : '';
    const className = `icon icon_base ${nameClass} ${sizeClass}`;

    super(
      {
        ...props,
        attributes: {
          class: `${className}`.trim(),
        },
      },
      'i'
    );
  }

  public setIconName(iconName: string): void {
    this.setProps({
      name: iconName,
    });

    const nameClass = iconName ? `icon_${iconName}` : '';
    const sizeClass = this.props.size ? `icon_${this.props.size}` : '';
    const className = `icon icon_base ${nameClass} ${sizeClass}`;

    this._element?.setAttribute('class', `${className}`.trim());
  }
}

export default Icon;
