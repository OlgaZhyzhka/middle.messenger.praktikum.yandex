import Block, { Props } from '@/core/Block';
import { Callback } from '@/utils/types';
import validate from '@/helpers/validators';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { Button } from '@/views/components/Button';

import tpl from './tpl';

class ModalChat extends Block {
  constructor(props: Props) {
    super({ ...props, attributes: { class: 'form form_horizontal' } }, 'form');
    this.setProps({
      titleInput: this.createTitleInput(),
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

  private createTitleInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { title: value };
      const validText = validate(data, 'title');
      const input = this.getChild('titleInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'title', type: 'text', placeholder: 'Chat name' },
      onBlur,
    };
    return this.createInput(inputProps);
  }

  private checkFormValidity(): boolean {
    const titleInput = this.getChild('titleInput') as InputElement;

    let isFormValid = true;

    if (titleInput?.getProps()?.isValid !== true) {
      titleInput?.setErrorMessage('Required chat name');
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
      children: 'OK',
      onClick: (event: Event): void => this.handleSubmit(event),
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
      title: formData.get('title') || '',
    };

    (this.props.onSubmit as Callback)?.(data);

    form.reset();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ModalChat;
