import Block, { Props } from '@/core/Block';
import { validate } from '@/helpers';
import { Callback } from '@/utils/types';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { Button } from '@/views/components/Button';
import tpl from './tpl';

class ModalUserForm extends Block {
  constructor(props: Props) {
    super(props, 'form');
    this.setProps({
      attributes: { class: 'form form_horizontal' },
      loginInput: this.createLoginInput(),
      submitButton: this.createSubmitButton(),
      cancelButton: this.createCancelButton(),
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
      onBlur,
      inputAttributes: { name: 'login', type: 'text', placeholder: 'Login' },
    };
    return this.createInput(inputProps);
  }

  private checkFormValidity(): boolean {
    const loginInput = this.getChild('loginInput') as InputElement;

    let isFormValid = true;

    if (loginInput?.getProps()?.isValid !== true) {
      loginInput?.setErrorMessage('Invalid login');
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
      onClick: (event: Event): void => this.handleSubmit(event),
      children: 'OK',
    });
  }

  private createCancelButton(): Button {
    return new Button({
      size: 'md',
      variant: 'primary-bordered',
      shape: 'rounded',
      children: 'Cancel',
      onClick: (event: Event): void => this.handleCancel(event),
    });
  }

  private handleCancel(event: Event): void {
    event.preventDefault();
    const form = this.element as HTMLFormElement;
    form.reset();
    (this.props.onCancel as Callback)?.();
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

    const data: Record<string, unknown> = {
      login: formData.get('login') || '',
    };

    (this.props.onSubmit as Callback)?.(data);

    form.reset();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ModalUserForm;
