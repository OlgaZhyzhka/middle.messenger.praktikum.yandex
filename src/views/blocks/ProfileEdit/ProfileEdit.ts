import Block, { Props } from '@/core/Block';
import { validate } from '@/helpers';
import { Upload } from '@/views/components/Upload';
import { Button } from '@/views/components/Button';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import tpl from './tpl';

class ProfileEdit extends Block {
  private file: File | null;

  constructor(props: Props) {
    super(props, 'form');
    this.file = null;
    this.setProps({
      attributes: { class: 'profile__form form form_horizontal' },
      uploadAvatar: new Upload({
        attributes: { class: 'profile__upload' },
        uploadId: 'avatar',
        onChange: (event: Event): void => this.handleChange(event),
      }),
      loginInput: this.createLoginInput(),
      emailInput: this.createEmailInput(),
      firstNameInput: this.createFirstNameInput(),
      secondNameInput: this.createSecondNameInput(),
      chatNameInput: this.createChatNameInput(),
      phoneInput: this.createPhoneInput(),
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
      onBlur,
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'login', type: 'text', placeholder: 'Login' },
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
      onBlur,
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'email', placeholder: 'Email', type: 'email' },
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
      onBlur,
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'first_name', type: 'text', placeholder: 'First Name' },
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
      onBlur,
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'second_name', type: 'text', placeholder: 'Second Name' },
    };
    return this.createInput(inputProps);
  }

  private createChatNameInput(): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      const data = { chatName: value };
      const validText = validate(data, 'chatName');
      const input = this.getChild('chatNameInput') as InputElement;
      input.setIsValid(!validText);
      if (validText) input.setErrorMessage(validText);
    };
    const inputProps = {
      onBlur,
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'chat_name', type: 'text', placeholder: 'Chat Name' },
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
      onBlur,
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'phone', type: 'tel', placeholder: 'Phone number' },
    };
    return this.createInput(inputProps);
  }

  private createSubmitButton(): Button {
    return new Button({
      attributes: { type: 'submit' },
      type: 'submit',
      size: 'md',
      variant: 'primary',
      shape: 'rounded',
      onClick: (event: Event): void => this.handleSubmit(event),
      children: 'Save',
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

  private resetUpload(): void {
    (this.children.uploadAvatar as Upload).reset();
  }

  private handleCancel(event: Event): void {
    event.preventDefault();
    this.resetUpload();
    const form = this.element as HTMLFormElement;
    form.reset();
  }

  private handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e): void => {
        const result = e.target?.result as string;
        const uploadPreview = this.children.uploadAvatar.getChild('uploadPreview') as Block;

        if (uploadPreview) {
          uploadPreview.setProps({
            attributes: { style: `background-image: url(${result})` },
          });
        }
      };

      reader.readAsDataURL(file);
      this.file = file;
      target.value = '';
    }
  }

  private checkFormValidity(): boolean {
    const loginInput = this.getChild('loginInput') as InputElement;
    const phoneInput = this.getChild('phoneInput') as InputElement;
    const emailInput = this.getChild('emailInput') as InputElement;
    const firstNameInput = this.getChild('firstNameInput') as InputElement;
    const secondNameInput = this.getChild('secondNameInput') as InputElement;
    const chatNameInput = this.getChild('chatNameInput') as InputElement;

    let isFormValid = true;

    if (loginInput?.getProps()?.isValid !== true) {
      loginInput?.setErrorMessage('Invalid login');
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

    if (chatNameInput?.getProps()?.isValid !== true) {
      chatNameInput?.setErrorMessage('Invalid chat name');
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

    if (this.file) {
      formData.append('avatar', this.file);
    }

    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);

    // fetch('/your-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // Обработайте результат
    //   })
    //   .catch((error) => {
    //     // Обработайте ошибку
    //   });

    this.resetUpload();
    form.reset();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ProfileEdit;
