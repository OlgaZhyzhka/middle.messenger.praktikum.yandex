import { Props } from '@/core/Block.ts';
import { BasePage } from '@/views/pages/BasePage';
import LoginForm from '@/views/blocks/LoginForm/LoginForm.ts';
import tpl from './tpl.ts';

class Login extends BasePage {
  constructor(props: Props) {
    super({
      ...props,
      pageTitle: 'Welcome back!',
      loginForm: new LoginForm({}),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Login;
