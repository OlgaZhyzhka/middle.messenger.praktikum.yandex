import Block, { Props } from '@/core/Block';
import { validate } from '@/helpers';
import { ROUTES } from '@/utils/enums';
import AuthService from '@/services/AuthService';
import { SignInRequest } from '@/utils/interfaces';
import { PasswordInput } from '@/views/blocks/PasswordInput';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { Button } from '@/views/components/Button';
import { RouterLink } from '@/views/components/RouterLink';

import tpl from './tpl';

class LoginForm extends Block {
  constructor(props: Props) {
    super(props, 'form');
    this.setProps({
      attributes: { class: 'form form_horizontal form_auth' },
      loginInput: this.createLoginInput(),
      passwordInput: this.createPasswordInput(),
      submitButton: this.createSubmitButton(),
      navButton: this.createNavButton(),
      text: 'Need an account?',
    });
  }

  private createInput({ onBlur, attributes = {}, inputAttributes = {} }: InputProps): InputElement {
    return new InputElement({
      size: 'sm',
      isValid: false,
      attributes,
      inputAttributes,
      onBlur,
    });
  }

  private createLoginInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { login: value };
      const validText = validate(data, 'login');
      const input = this.getChild('loginInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'login', type: 'text', placeholder: 'Login' },
      onBlur,
    };
    return this.createInput(inputProps);
  }

  private createPasswordInput(): PasswordInput {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { password: value };
      const validText = validate(data, 'password');
      const passwordInput = this.getChild('passwordInput')?.getChild('inputElement') as InputElement;
      passwordInput.setIsValid(!validText);
      if (validText) passwordInput.setErrorMessage(validText);
    };
    const inputProps = {
      inputAttributes: { name: 'password', type: 'password', placeholder: 'Password' },
      onBlur,
    };
    return new PasswordInput({
      attributes: { class: 'form__row' },
      inputElement: this.createInput(inputProps),
    });
  }

  private checkFormValidity(): boolean {
    const loginInput = this.getChild('loginInput') as InputElement;
    const passwordInput = this.getChild('passwordInput')?.getChild('inputElement') as InputElement;

    let isFormValid = true;

    if (loginInput?.getProps()?.isValid !== true) {
      loginInput?.setErrorMessage('Invalid login');
      isFormValid = false;
    }

    if (passwordInput?.getProps()?.isValid !== true) {
      passwordInput?.setErrorMessage('Invalid password');
      isFormValid = false;
    }

    return isFormValid;
  }

  private createSubmitButton(): Button {
    return new Button({
      attributes: { type: 'submit' },
      type: 'submit',
      size: 'md',
      variant: 'primary',
      shape: 'rounded',
      children: 'Login',
      onClick: (event: Event): void => this.handleSubmit(event),
    });
  }

  private createNavButton(): RouterLink {
    return new RouterLink({
      size: 'md',
      variant: 'primary-bordered',
      shape: 'rounded',
      children: 'Create an account',
      to: ROUTES.Registration,
    });
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const form = this.element as HTMLFormElement;

    if (!form) {
      console.error('Form element not found');
      return;
    }

    const isFormValid = this.checkFormValidity();

    if (!isFormValid) {
      console.error('Invalid input value');
      return;
    }

    const formData = new FormData(form);

    const data: SignInRequest = {
      login: formData.get('login')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };

    AuthService.login(data);

    console.log(data);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default LoginForm;
