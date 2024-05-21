import Block from '@/core/Block';
import AuthService from '@/services/AuthService';
import { currentUser } from '@/utils/constants';
import { ROUTES } from '@/utils/enums';
import { Logo } from '@/views/components/Logo';
import { Avatar } from '@/views/components/Avatar';
import { RouterLink } from '@/views/components/RouterLink';
import { Link } from '@/views/components/Link';

import { SidebarProps } from './interfaces/SidebarProps';
import tpl from './tpl';

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super(props, 'aside');

    if (props.isMessenger) {
      this.setProps({
        attributes: { class: 'sidebar panel' },
        logo: new Logo({}),
        userAvatar: new Avatar({ src: currentUser.avatar, title: currentUser.login, size: 'sm' }),
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

export default Sidebar;
