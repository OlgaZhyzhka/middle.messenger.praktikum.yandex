import Block from '@/core/Block';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import AuthService from '@/services/AuthService';
import connect from '@/helpers/connect.ts';
import { IStore } from '@/store/index.ts';
import { ROUTES } from '@/utils/enums';
import { holder } from '@/utils/constants';
import { Logo } from '@/views/components/Logo';
import { Avatar } from '@/views/components/Avatar';
import { RouterLink } from '@/views/components/RouterLink';
import { Link } from '@/views/components/Link';

import { SidebarProps } from './interfaces/SidebarProps';
import tpl from './tpl';

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super(props, 'aside');
    const { avatar, login } = props;

    if (props.isMessenger) {
      this.setProps({
        attributes: { class: 'sidebar panel' },
        logo: new Logo({}),
        userAvatar: new Avatar({ src: avatar ? `${RESOURCE_URL}${avatar}` : holder, title: login, size: 'sm' }),
        linkToProfile: new RouterLink(
          {
            attributes: { class: 'sidebar__link' },
            children: 'Settings',
            to: ROUTES.Settings,
          },
          'span'
        ),
      });
    }

    if (props.isSettings) {
      this.setProps({
        attributes: { class: 'sidebar panel' },
        logo: new Logo({}),
        linkToLogout: new Link({
          attributes: { class: 'sidebar__link' },
          children: 'Logout',
          onClick: (event: Event): void => this.handleLogout(event),
        }),
      });
    }
  }

  private handleLogout(event: Event): void {
    event.preventDefault();
    AuthService.logout();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ user }: IStore) => ({
  avatar: user?.avatar,
  login: user?.login,
  userId: user?.id,
});

export default connect(mapStateToProps)(Sidebar);
