import Block, { Props } from '@/core/Block';
import { LoginForm } from '@/views/blocks/LoginForm';
import { RegistrationForm } from '@/views/blocks/RegistrationForm';
import { Button } from '@/views/components/Button';
import tpl from './tpl';

class Form extends Block {
  constructor(props: Props) {
    super(
      {
        ...props,
        loginForm: new LoginForm({
          type: 'login',
        }),
        registrationForm: new RegistrationForm({
          type: 'registration',
        }),
        isLogin: props.type === 'login',
        isRegister: props.type === 'registration',
        submitButton: new Button({
          type: 'submit',
          size: 'md',
          variant: 'primary',
          shape: 'rounded',
          onClick: (event):void => {
            event.preventDefault();
            console.log(event.target);
          },
          children: props.type === 'login' ? 'Login' : 'Create an account',
        }),
        linkButton: new Button({
          size: 'md',
          variant: 'primary-bordered',
          shape: 'rounded',
          onClick: (event):void => {
            event.preventDefault();
            console.log(event.target);
          },
          children: props.type === 'login' ? 'Create an account' : 'Login',
        }),
        text: props.type === 'login' ? 'Need an account?' : 'Already have an account?',
      },
      'form'
    );
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Form;
