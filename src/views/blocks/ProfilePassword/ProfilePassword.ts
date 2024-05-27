import Block, { Props } from '@/core/Block';
import { IStore } from '@/store/index.ts';
import connect from '@/helpers/connect.ts';
import { validate } from '@/helpers';
import { UpdatePassword } from '@/utils/interfaces';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { PasswordInput } from '@/views/blocks/PasswordInput';
import { Spinner } from '@/views/components/Spinner';
import { Button } from '@/views/components/Button';

import tpl from './tpl';
import UserService from '@/services/UserService';

class ProfilePassword extends Block {
  constructor(props: Props) {
    super(props, 'form');
    this.setProps({
      attributes: { class: 'profile__form form form_horizontal' },
      oldPasswordInput: this.createOldPasswordInput(),
      passwordInput: this.createPasswordInput(),
      confirmPasswordInput: this.createConfirmPasswordInput(),
      submitButton: this.createSubmitButton(),
      cancelButton: this.createCancelButton(),
      spinner: new Spinner({ attributes: { class: 'profile__spinner spinner_local' } }),
    });
  }

  private createSubmitButton(): Button {
    return new Button({
      attributes: { type: 'submit' },
      type: 'submit',
      size: 'md',
      variant: 'primary',
      shape: 'rounded',
      children: 'Save',
      onClick: (event: Event): void => this.handleSubmit(event),
    });
  }

  private createCancelButton(): Button {
    return new Button({
      size: 'md',
      variant: 'link',
      children: 'Reset',
      onClick: (event: Event): void => this.handleCancel(event),
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

  private createOldPasswordInput(): PasswordInput {
    const inputProps = {
      inputAttributes: { name: 'old_password', type: 'password', placeholder: 'Old Password', required: true },
    };
    return new PasswordInput({
      attributes: { class: 'form__row' },
      inputElement: this.createInput(inputProps),
    });
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
    const passwordInput = this.getChild('passwordInput')?.getChild('inputElement') as InputElement;
    const confirmPasswordInput = this.getChild('confirmPasswordInput')?.getChild('inputElement') as InputElement;

    let isFormValid = true;

    if (passwordInput?.getProps()?.isValid !== true) {
      passwordInput?.setErrorMessage('Invalid password');
      isFormValid = false;
    }

    if (confirmPasswordInput?.getProps()?.isValid !== true) {
      confirmPasswordInput?.setErrorMessage('Passwords do not match');
      isFormValid = false;
    }

    return isFormValid;
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

    const apiData: UpdatePassword = {
      oldPassword: formData.get('old_password')?.toString() || '',
      newPassword: formData.get('password')?.toString() || '',
    };

    UserService.updatePassword(apiData);

    form.reset();
  }

  private handleCancel(event: Event): void {
    event.preventDefault();
    const form = this.element as HTMLFormElement;
    form.reset();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isLoading, updateError, isUpdatePassword }: IStore) => ({
  isLoading,
  updateError,
  isUpdatePassword,
});

export default connect(mapStateToProps)(ProfilePassword);