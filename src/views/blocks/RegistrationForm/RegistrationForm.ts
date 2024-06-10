import Block, { Props } from '@/core/Block';
import { validate } from '@/helpers';
import { ROUTES } from '@/utils/enums';
import AuthService from '@/services/AuthService';
import { mapSignUpData } from '@/helpers/mapData';
import { RegistrationFormData } from '@/utils/interfaces';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { PasswordInput } from '@/views/blocks/PasswordInput';
import { RouterLink } from '@/views/components/RouterLink';
import { Button } from '@/views/components/Button';

import tpl from './tpl';

class RegistrationForm extends Block {
  constructor(props: Props) {
    super(props, 'form');
    this.setProps({
      attributes: { class: 'form form_horizontal form_auth' },
      loginInput: this.createLoginInput(),
      emailInput: this.createEmailInput(),
      firstNameInput: this.createFirstNameInput(),
      secondNameInput: this.createSecondNameInput(),
      phoneInput: this.createPhoneInput(),
      passwordInput: this.createPasswordInput(),
      confirmPasswordInput: this.createConfirmPasswordInput(),
      submitButton: this.createSubmitButton(),
      navButton: this.createNavButton(),
      text: 'Already have an account?',
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

  private createEmailInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { email: value };
      const validText = validate(data, 'email');
      const input = this.getChild('emailInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'email', placeholder: 'Email', type: 'email' },
      onBlur,
    };
    return this.createInput(inputProps);
  }

  private createFirstNameInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { firstName: value };
      const validText = validate(data, 'firstName');
      const input = this.getChild('firstNameInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'first_name', type: 'text', placeholder: 'First Name' },
      onBlur,
    };
    return this.createInput(inputProps);
  }

  private createSecondNameInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { secondName: value };
      const validText = validate(data, 'secondName');
      const input = this.getChild('secondNameInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'second_name', type: 'text', placeholder: 'Second Name' },
      onBlur,
    };
    return this.createInput(inputProps);
  }

  private createPhoneInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { phone: value };
      const validText = validate(data, 'phone');
      const input = this.getChild('phoneInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'phone', type: 'tel', placeholder: 'Phone number' },
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

  private createConfirmPasswordInput(): PasswordInput {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const passwordInput = this.getChild('passwordInput')?.getChild('inputElement') as InputElement;
      const passwordValue = passwordInput.getInputElement().value;
      const data = { oldPassword: passwordValue, newPassword: value };
      const validText = validate(data, 'confirmPassword');
      const confirmPasswordInput = this.getChild('confirmPasswordInput')?.getChild('inputElement') as InputElement;
      confirmPasswordInput.setIsValid(!validText);
      if (validText) confirmPasswordInput.setErrorMessage(validText);
    };
    const inputProps = {
      inputAttributes: { name: 'confirm_password', type: 'password', placeholder: 'Confirm Password' },
      onBlur,
    };
    return new PasswordInput({
      attributes: { class: 'form__row' },
      inputElement: this.createInput(inputProps),
    });
  }

  private checkFormValidity(): boolean {
    const loginInput = this.getChild('loginInput') as InputElement;
    const phoneInput = this.getChild('phoneInput') as InputElement;
    const emailInput = this.getChild('emailInput') as InputElement;
    const firstNameInput = this.getChild('firstNameInput') as InputElement;
    const secondNameInput = this.getChild('secondNameInput') as InputElement;
    const passwordInput = this.getChild('passwordInput')?.getChild('inputElement') as InputElement;
    const confirmPasswordInput = this.getChild('confirmPasswordInput')?.getChild('inputElement') as InputElement;

    let isFormValid = true;

    if (loginInput?.getProps()?.isValid !== true) {
      loginInput?.setErrorMessage('Invalid login');
      isFormValid = false;
    }

    if (passwordInput?.getProps()?.isValid !== true) {
      passwordInput?.setErrorMessage('Invalid password');
      isFormValid = false;
    }

    if (confirmPasswordInput?.getProps()?.isValid !== true) {
      confirmPasswordInput?.setErrorMessage('Passwords do not match');
      isFormValid = false;
    }

    if (phoneInput?.getProps()?.isValid !== true) {
      phoneInput?.setErrorMessage('Invalid phone number');
      isFormValid = false;
    }

    if (emailInput?.getProps()?.isValid !== true) {
      emailInput?.setErrorMessage('Invalid email');
      isFormValid = false;
    }

    if (firstNameInput?.getProps()?.isValid !== true) {
      firstNameInput?.setErrorMessage('Invalid first name');
      isFormValid = false;
    }

    if (secondNameInput?.getProps()?.isValid !== true) {
      secondNameInput?.setErrorMessage('Invalid second name');
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
      children: 'Create an account',
      onClick: (event: Event): void => this.handleSubmit(event),
    });
  }

  private createNavButton(): RouterLink {
    return new RouterLink({
      size: 'md',
      variant: 'primary-bordered',
      shape: 'rounded',
      children: 'Login',
      to: ROUTES.Login,
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

    const data: RegistrationFormData = {
      login: formData.get('login')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      firstName: formData.get('first_name')?.toString() || '',
      secondName: formData.get('second_name')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
    };

    const apiData = mapSignUpData(data);

    AuthService.signUp(apiData);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default RegistrationForm;
