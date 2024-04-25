import Block, { Props } from '@/core/Block';
import { currentUser, logoData } from '@/utils/constants';
import { Logo } from '@/views/components/Logo';
import { Link } from '@/views/components/Link';
import { Avatar } from '@/views/components/Avatar';
import tpl from './tpl';

interface SidebarProps extends Props {
  isMessenger?: boolean;
  isProfile?: boolean;
}

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super(props, 'aside');

    // TODO request to server for user data
    if (props.isMessenger) {
      this.setProps({
        attributes: { class: 'sidebar panel' },
        logo: new Logo({
          src: logoData.src,
          text: logoData.text,
        }),
        userAvatar: new Avatar({ src: currentUser.avatar, title: currentUser.name, size: 'sm' }),
        linkToProfile: new Link({ attributes: { href: '/settings', class: 'sidebar__link' }, text: 'Settings' }),
      });
    }
    
    if (props.isProfile) {
      this.setProps({
        attributes: { class: 'sidebar panel' },
        logo: new Logo({
          src: logoData.src,
          text: logoData.text,
        }),
        linkToLogout: new Link({ attributes: { href: '/logout', class: 'sidebar__link' }, text: 'Logout' }),
      });
    }
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Sidebar;
