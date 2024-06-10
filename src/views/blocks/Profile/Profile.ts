import Block from '@/core/Block';
import { ProfileCard } from '@/views/blocks/ProfileCard';

import { ProfileProps } from './interfaces/interfaces';
import tpl from './tpl';

class Profile extends Block {
  constructor(props: ProfileProps) {
    super({
      ...props,
      profileCard: new ProfileCard({ attributes: { class: 'profile__card' } }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Profile;
