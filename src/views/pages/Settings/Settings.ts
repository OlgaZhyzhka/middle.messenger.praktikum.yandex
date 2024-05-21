import Block, { Props } from '@/core/Block.ts';
import { Sidebar } from '@/views/blocks/Sidebar';
import Profile from '@/views/blocks/Profile/Profile.ts';

import tpl from './tpl.ts';

class Settings extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'page page_inner' },
      sidebar: new Sidebar({
        isMessenger: false,
        isSettings: true,
      }),
      profile: new Profile({ attributes: { class: 'profile' }}),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Settings;
