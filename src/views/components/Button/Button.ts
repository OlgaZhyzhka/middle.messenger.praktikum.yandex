import Template from '@/core/Template';
import tpl from './tpl.hbs?raw';

type Props = {
  class?: string;
  body: string;
};

class Button extends Template {
  constructor(private props: Props) {
    super(tpl);
  }

  public render(): string {
    return super.render(this.props);
  }
}

export default Button;
