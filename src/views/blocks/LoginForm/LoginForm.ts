import Template from '@/core/Template';
import { Input } from '@/views/components/Input';
import { Button } from '@/views/components/Button';
import tpl from './tpl.hbs?raw';

type Props = {
  userName?: string;
  class?: string;
};

class LoginForm extends Template {
  private loginInput: Input;

  private passwordInput: Input;

  private submitButton: Button;

  constructor(private props: Props) {
    super(tpl);
    this.loginInput = new Input({ class: 'ui-input', type: 'text', placeholder: 'Login', name: 'login' });
    this.passwordInput = new Input({ class: 'ui-input', type: 'password', placeholder: 'Password', name: 'password' });
    this.submitButton = new Button({ class: 'ui-input', body: 'Login' });
  }

  public render(): string {
    const loginInputHtml = this.loginInput.render();
    const passwordInputHtml = this.passwordInput.render();
    const submitButtonHtml = this.submitButton.render();

    return super.render({
      ...this.props,
      loginInput: loginInputHtml,
      passwordInput: passwordInputHtml,
      submitButton: submitButtonHtml,
    });
  }
}

export default LoginForm;
