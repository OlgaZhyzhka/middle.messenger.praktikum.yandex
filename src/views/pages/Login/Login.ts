import { Form } from '@/views/blocks/Form';
import { BasePage } from '@/views/pages/BasePage';
import { BasePageProps } from '@/views/pages/BasePage/BasePage.ts';
import tpl from './tpl.ts';

interface LoginProps extends BasePageProps {
  imgSrc: string;
  imgAlt: string;
}

class Login extends BasePage {
  constructor(props: LoginProps) {
    super({
      ...props,
      pageTitle: 'Welcome back!',
      form: new Form({
        attributes: { class: 'form form_horizontal form_auth' },
        type: 'login',
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Login;
