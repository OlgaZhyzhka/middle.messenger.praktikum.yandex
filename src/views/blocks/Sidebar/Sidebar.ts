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
    this.setProps({
      attributes: { class: 'sidebar panel' },
      logo: new Logo({
        src: logoData.src,
        text: logoData.text,
      }),
      // TODO request to server for user data
      userAvatar: props.isMessenger
        ? new Avatar({ src: currentUser.avatar, title: currentUser.name, size: 'sm' })
        : null,
      linkToProfile: props.isMessenger
        ? new Link({ attributes: { href: '/settings', class: 'sidebar__link' }, text: 'Settings' })
        : null,
      linkToLogout: props.isSettings
        ? new Link({ attributes: { href: '/logout', class: 'sidebar__link' }, text: 'Logout' })
        : null,
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Sidebar;
