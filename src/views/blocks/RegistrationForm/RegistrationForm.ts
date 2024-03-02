import Block, { Props } from '@/core/Block';
import { Input } from '@/views/components/Input';
import tpl from './tpl';

class RegistrationForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
      loginInput: new Input({
        attributes: { class: 'form__row' },
        type: 'text',
        size: 'sm',
        name: 'login',
        placeholder: 'Login',
      }),
      passwordInput: new Input({
        attributes: { class: 'form__row' },
        type: 'password',
        size: 'sm',
        name: 'password',
        placeholder: 'Password',
      }),
      confirmPasswordInput: new Input({
        attributes: { class: 'form__row' },
        type: 'password',
        size: 'sm',
        name: 'confirm_password',
        placeholder: 'Confirm Password',
      }),
      emailInput: new Input({
        attributes: { class: 'form__row' },
        type: 'email',
        size: 'sm',
        name: 'email',
        placeholder: 'Email',
      }),
      firstNameInput: new Input({
        attributes: { class: 'form__row' },
        type: 'text',
        size: 'sm',
        name: 'first_name',
        placeholder: 'First Name',
      }),
      lastNameInput: new Input({
        attributes: { class: 'form__row' },
        type: 'text',
        size: 'sm',
        name: 'second_name',
        placeholder: 'Last Name',
      }),
      phoneInput: new Input({
        attributes: { class: 'form__row' },
        type: 'tel',
        size: 'sm',
        name: 'phone',
        placeholder: 'Phone number',
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default RegistrationForm;
