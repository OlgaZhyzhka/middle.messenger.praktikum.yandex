import { Props } from '@/core/Block.ts';
import connect from '@/helpers/connect.ts';
import { PlainObject } from '@/utils/types.ts';
import { BasePage } from '@/views/pages/BasePage';
import LoginForm from '@/views/blocks/LoginForm/LoginForm.ts';
import tpl from './tpl.ts';
import Spinner from '@/views/components/Spinner/Spinner.ts';

class Login extends BasePage {
  constructor(props: Props) {
    super({
      ...props,
      pageTitle: 'Welcome back!',
      spinner: new Spinner({}),
      loginForm: new LoginForm({}),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isLoading, loginFields }: PlainObject) => ({
  isLoading,
  loginFields,
});

export default connect(mapStateToProps)(Login);
