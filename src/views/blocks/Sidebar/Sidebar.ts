import Block from '@/core/Block';
import { currentUser, logoData } from '@/utils/constants';
import { Routes } from '@/utils/enums';
import { Logo } from '@/views/components/Logo';
import { Link } from '@/views/components/Link';
import { Avatar } from '@/views/components/Avatar';
import { SidebarProps } from './interfaces/SidebarProps';
import tpl from './tpl';



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
        userAvatar: new Avatar({ src: currentUser.avatar, title: currentUser.login, size: 'sm' }),
        linkToProfile: new Link({ attributes: { href: Routes.Settings, class: 'sidebar__link' }, text: 'Settings' }),
      });
    }
    
    if (props.isSettings) {
      this.setProps({
        attributes: { class: 'sidebar panel' },
        logo: new Logo({
          src: logoData.src,
          text: logoData.text,
        }),
        linkToLogout: new Link({ attributes: { href: Routes.Logout, class: 'sidebar__link' }, text: 'Logout' }),
      });
    }
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Sidebar;
