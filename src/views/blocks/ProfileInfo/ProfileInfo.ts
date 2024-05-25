import Block, { Props } from '@/core/Block';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import connect from '@/helpers/connect.ts';
import { IStore } from '@/store/index.ts';
import { holder } from '@/utils/constants';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class ProfileInfo extends Block {
  constructor(props: Props) {
    super(props);
    const { avatar, firstName, secondName, phone, email, login, chatName } = this.props;

    this.setProps({
      attributes: { class: `${props.attributes?.class || ''} profile__info`.trim() },
      avatar: new Avatar({ src: avatar ? `${RESOURCE_URL}${avatar }` : holder, size: 'lg' }),
      email,
      firstName,
      secondName,
      chatName,
      login,
      phone,
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ user }: IStore) => ({
  login: user?.login || '',
  email: user?.email || '',
  phone: user?.phone || '',
  avatar: user?.avatar || '',
  firstName: user?.first_name || '',
  secondName: user?.second_name || '',
  chatName: user?.display_name || '',
});

export default connect(mapStateToProps)(ProfileInfo);
