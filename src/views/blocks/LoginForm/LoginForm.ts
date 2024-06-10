import Block, { Props } from '@/core/Block';
import { Input } from '@/views/components/Input';
import { ErrorText } from '@/views/components/ErrorText';
import tpl from './tpl';

class LoginForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
      loginInput: new Input({
        attributes: { class: 'form__row' },
        type: 'text',
        size: 'sm',
        name: 'login',
        placeholder: 'Login',
        errorText: new ErrorText({
          attributes: { class: 'form__error' },
          text: 'Login is required',
        }),
      }),
      passwordInput: new Input({
        attributes: { class: 'form__row' },
        type: 'password',
        size: 'sm',
        name: 'password',
        placeholder: 'Password',
        errorText: new ErrorText({
          attributes: { class: 'form__error' },
          text: 'Password is required',
        }),
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default LoginForm;
