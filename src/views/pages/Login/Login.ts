import Template from '@/core/Template';
import { LoginForm } from '@/views/blocks/LoginForm';
import tpl from './tpl.hbs?raw';

class LoginPage extends Template {
  private loginForm: LoginForm;

  constructor() {
    super(tpl);
    this.loginForm = new LoginForm({ userName: 'Marta', class: 'form_horizontal' });
  }

  public render(): string {
    const loginFormHtml = this.loginForm.render();
    return super.render({
      loginForm: loginFormHtml,
    });
  }
}

export default LoginPage;
