import Block, { Props } from '@/core/Block'
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import { holder } from '@/utils/constants';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class User extends Block {
  constructor(props: Props) {
    super(props, 'li');
    const { avatar, login, role } = props;
    this.setProps({
      isAdmin: role === 'admin',
      avatar: new Avatar({
        src: avatar ? `${RESOURCE_URL}${avatar}` : holder,
        alt: login,
        size: 'xs',
      }),
    });
  }


  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default User;
