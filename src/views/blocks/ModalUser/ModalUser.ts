import Block, { Props } from '@/core/Block';
import { IStore } from '@/store';
import connect from '@/helpers/connect';
import { validate } from '@/helpers';
import { Callback } from '@/utils/types';
import { ChatUser } from '@/utils/interfaces';
import { InputElement } from '@/views/components/InputElement';
import { InputProps } from '@/views/components/Input/interfaces/InputProps';
import { Button } from '@/views/components/Button';
import { User } from '@/views/blocks/User';

import tpl from './tpl';

class ModalUser extends Block {
  constructor(props: Props) {
    super(props, 'form');
    this.setProps({
      userList: this.createUserList(),
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
      inputAttributes: { name: 'login', type: 'text', placeholder: 'Login' },
      onBlur,
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

    if (!this.children.loginInput) {
      return;
    }

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

  private createUserList(): Block[] | undefined {
    const users: ChatUser[] = (this.props.users as Record<string, []>)?.list;

    if (!users) {
      return undefined;
    }

    return users
      .sort((_, b) => (b.role === 'admin' ? 1 : -1))
      .map(
        (user) =>
          new User({
            ...user,
          })
      );
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.users !== newProps.users) {
      this.setProps({
        userList: this.createUserList(),
      });
    }

    return true;
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isChatUserLoading, chatUsers }: IStore) => ({
  isChatUserLoading,
  users: { list: chatUsers },
});

export default connect(mapStateToProps)(ModalUser);
