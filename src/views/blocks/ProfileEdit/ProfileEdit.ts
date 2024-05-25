import Block, { Props } from '@/core/Block';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import UserService from '@/services/UserService';
import { IStore } from '@/store/index.ts';
import connect from '@/helpers/connect.ts';
import { mapUserProfileData } from '@/helpers/mapData';
import { validate } from '@/helpers';
import { holder } from '@/utils/constants';
import { UpdateFormData } from '@/utils/interfaces';
import { Spinner } from '@/views/components/Spinner';
import { Upload } from '@/views/components/Upload';
import { Button } from '@/views/components/Button';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class ProfileEdit extends Block {
  private file: File | null;

  constructor(props: Props) {
    super(props, 'form');
    this.file = null;
    const { avatar, firstName, secondName, phone, email, login, chatName } = this.props;
    this.setProps({
      attributes: { class: 'profile__form form form_horizontal' },
      avatar: new Avatar({
        attributes: { class: 'profile__avatar' },
        src: avatar ? `${RESOURCE_URL}${avatar}` : holder,
        size: 'lg',
      }),
      uploadAvatar: new Upload({
        attributes: { class: 'profile__upload' },
        uploadId: 'avatar',
        onChange: (event: Event): void => this.handleChange(event),
      }),
      loginInput: this.createLoginInput(login as string | null),
      emailInput: this.createEmailInput(email as string | null),
      firstNameInput: this.createFirstNameInput(firstName as string | null),
      secondNameInput: this.createSecondNameInput(secondName as string | null),
      chatNameInput: this.createChatNameInput(chatName as string | null),
      phoneInput: this.createPhoneInput(phone as string | null),
      submitButton: this.createSubmitButton(),
      cancelButton: this.createCancelButton(),
      spinner: new Spinner({}),
    });
  }

  private createInput({ attributes = {}, inputAttributes = {}, onBlur }: InputProps): InputElement {
    return new InputElement({
      size: 'sm',
      isValid: false,
      attributes,
      inputAttributes,
      onBlur,
    });
  }

  private checkInputValidity(type: string, value: string, inputElement?: InputElement): void {
    const data = { [type]: value };
    const validText = validate(data, type);
    const input = inputElement || (this.getChild(`${type}Input`) as InputElement);
    input.setIsValid(!validText);
    if (validText) input.setErrorMessage(validText);
  }

  private createLoginInput(initValue: string | null): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      this.checkInputValidity('login', value);
    };
    const value = initValue || '';
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: { name: 'login', type: 'text', placeholder: 'Login', value },
      onBlur,
    };
    const loginInput = this.createInput(inputProps);

    if (initValue) {
      this.checkInputValidity('login', initValue, loginInput);
    }

    return loginInput;
  }

  private createEmailInput(initValue: string | null): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      this.checkInputValidity('email', value);
    };
    const value = initValue || '';
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        value: value || '',
      },
      onBlur,
    };
    const emailInput = this.createInput(inputProps);

    if (initValue) {
      this.checkInputValidity('email', initValue, emailInput);
    }

    return emailInput;
  }

  private createFirstNameInput(initValue: string | null): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      this.checkInputValidity('firstName', value);
    };
    const value = initValue || '';
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: {
        name: 'first_name',
        type: 'text',
        placeholder: 'First Name',
        value: value || '',
      },
      onBlur,
    };
    const firstNameInput = this.createInput(inputProps);

    if (initValue) {
      this.checkInputValidity('firstName', initValue, firstNameInput);
    }

    return firstNameInput;
  }

  private createSecondNameInput(initValue: string | null): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      this.checkInputValidity('secondName', value);
    };
    const value = initValue || '';
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: {
        name: 'second_name',
        type: 'text',
        placeholder: 'Second Name',
        value: value || '',
      },
      onBlur,
    };
    const secondNameInput = this.createInput(inputProps);

    if (initValue) {
      this.checkInputValidity('secondName', initValue, secondNameInput);
    }

    return secondNameInput;
  }

  private createChatNameInput(initValue: string | null): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      this.checkInputValidity('chatName', value);
    };
    const value = initValue || '';
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: {
        name: 'display_name',
        type: 'text',
        placeholder: 'Chat Name',
        value: value || '',
      },
      onBlur,
    };
    const chatNameInput = this.createInput(inputProps);

    if (initValue) {
      this.checkInputValidity('chatName', initValue, chatNameInput);
    }

    return chatNameInput;
  }

  private createPhoneInput(initValue: string | null): InputElement {
    const onBlur = (event: Event): void => {
      const { value } = event.target as HTMLInputElement;
      this.checkInputValidity('phone', value);
    };
    const value = initValue || '';
    const inputProps = {
      attributes: { class: 'form__row' },
      inputAttributes: {
        name: 'phone',
        type: 'tel',
        placeholder: 'Phone number',
        value: value || '',
      },
      onBlur,
    };
    const phoneInput = this.createInput(inputProps);

    if (initValue) {
      this.checkInputValidity('phone', initValue, phoneInput);
    }

    return phoneInput;
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

      const form = this.element as HTMLFormElement;
      const formData = new FormData(form);

      if (this.file) {
        formData.append('avatar', this.file);
      }

      UserService.updateAvatar(formData);
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

    const data: UpdateFormData = {
      login: formData.get('login')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      firstName: formData.get('first_name')?.toString() || '',
      secondName: formData.get('second_name')?.toString() || '',
      chatName: formData.get('display_name')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
    };

    const apiData = mapUserProfileData(data);

    UserService.updateProfile(apiData);

    form.reset();
    this.resetUpload();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isLoading, user, updateError }: IStore) => ({
  isLoading,
  login: user?.login || '',
  email: user?.email || '',
  phone: user?.phone || '',
  avatar: user?.avatar || '',
  firstName: user?.first_name || '',
  secondName: user?.second_name || '',
  chatName: user?.display_name || '',
  updateError,
});

export default connect(mapStateToProps)(ProfileEdit);
