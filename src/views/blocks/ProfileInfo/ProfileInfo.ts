import Block, { Props } from '@/core/Block';
import { currentUser, holder } from '@/utils/constants';
import { Avatar } from '@/views/components/Avatar';
import tpl from './tpl';

class ProfileInfo extends Block {
  constructor(props: Props) {
    super(props);
    const { avatar, email, firstName, secondName, chatName, login, phone } = currentUser;
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

export default ProfileInfo;
