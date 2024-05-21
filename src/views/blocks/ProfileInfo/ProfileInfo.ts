import Block, { Props } from '@/core/Block';
import connect from '@/helpers/connect.ts';
import { IStore } from '@/store/index.ts';
import { holder } from '@/utils/constants';
import { UserDTO } from '@/utils/interfaces';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class ProfileInfo extends Block {
  constructor(props: Props) {
    super(props);
    const {
      avatar,
      email,
      first_name: firstName,
      second_name: secondName,
      display_name: chatName,
      login,
      phone,
    } = props.user as UserDTO;
    this.setProps({
      attributes: { class: `${props.attributes?.class || ''} profile__info`.trim() },
      avatar: new Avatar({ src: avatar || holder, size: 'lg' }),
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
const mapStateToProps = ({ isLoading, user }: IStore) => ({
  isLoading,
  user,
});

export default connect(mapStateToProps)(ProfileInfo);
