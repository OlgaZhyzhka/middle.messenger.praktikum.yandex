import { BasePage } from '@/views/pages/BasePage';
import { Form } from '@/views/blocks/Form';
import { BasePageProps } from '@/views/pages/BasePage/BasePage.ts';
import tpl from './tpl.ts';

interface RegistrationProps extends BasePageProps {}

class Registration extends BasePage {
  constructor(props: RegistrationProps) {
    super({
      ...props,
      pageTitle: 'Connect easily with your family and friends over countries',
      form: new Form({
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
