import { Props } from '@/core/Block.ts';
import connect from '@/helpers/connect.ts';
import { IStore } from '@/store/index.ts';
import { BasePage } from '@/views/pages/BasePage';
import { RegistrationForm } from '@/views/blocks/RegistrationForm/index.ts';
import Spinner from '@/views/components/Spinner/Spinner.ts';

import tpl from './tpl.ts';

class Registration extends BasePage {
  constructor(props: Props) {
    super(props);
    this.setProps({
      spinner: new Spinner({}),
      title: 'Connect easily with your family and friends over countries',
      registrationForm: new RegistrationForm({
        attributes: { class: 'form form_horizontal form_auth' },
        type: 'registration',
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ isLoading, signUpError }: IStore) => ({
  isLoading,
  signUpError,
});

export default connect(mapStateToProps)(Registration);
