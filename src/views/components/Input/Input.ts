import Template from '@/core/Template';
import tpl from './tpl.hbs?raw';

type Props = {
  class?: string;
  type: string;
  placeholder: string;
  name: string;
};

class Input extends Template {

  constructor(private props: Props) {
    super(tpl);
  }

  public render(): string {
    return super.render(this.props);
  }
}

export default Input;
