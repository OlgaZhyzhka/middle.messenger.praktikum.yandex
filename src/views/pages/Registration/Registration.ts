import { Props } from '@/core/Block.ts';
import { BasePage } from '@/views/pages/BasePage';
import { RegistrationForm } from '@/views/blocks/RegistrationForm/index.ts';
import tpl from './tpl.ts';


class Registration extends BasePage {
  constructor(props: Props) {
    super({
      ...props,
      pageTitle: 'Connect easily with your family and friends over countries',
      registrationForm: new RegistrationForm({
        attributes: { class: 'form form_horizontal form_auth' },
        type: 'registration',
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Registration;
