import { Props } from '@/core/Block.ts';
import connect from '@/helpers/connect.ts';
import { IStore } from '@/store/index.ts';
import { BasePage } from '@/views/pages/BasePage';
import LoginForm from '@/views/blocks/LoginForm/LoginForm.ts';
import Spinner from '@/views/components/Spinner/Spinner.ts';

import tpl from './tpl.ts';

class Login extends BasePage {
  constructor(props: Props) {
    super({
      ...props,
      spinner: new Spinner({}),
      title: 'Welcome back!',
      loginForm: new LoginForm({ }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isLoading, loginError }: IStore) => ({
  isLoading,
  loginError,
});

export default connect(mapStateToProps)(Login);
