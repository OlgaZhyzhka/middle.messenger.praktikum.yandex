import Block, { Props } from '@/core/Block';
import { Tabs } from '@/views/components/Tabs';
import { TabProps } from '@/views/components/Tab/interfaces/TabProps';
import { ProfileInfo } from '@/views/blocks/ProfileInfo';
import { ProfileEdit } from '@/views/blocks/ProfileEdit';
import { ProfilePassword } from '@/views/blocks/ProfilePassword';
import tpl from './tpl';

class ProfileCard extends Block {
  constructor(props: Props) {
    super(props);
    const tabs: TabProps[] = [
      {
        title: 'Information',
        index: 0,
        content: null,
      },
      {
        title: 'Edit Profile',
        index: 1,
        content: null,
      },
      {
        title: 'Change Password',
        index: 2,
        content: null,
      },
    ];
    this.setProps({
      attributes: { class: `${props.attributes?.class || ''} card`.trim() },
      tabs: new Tabs({
        attributes: { class: 'profile__tabs' },
        items: tabs,
        onChange: (index: number): Block => this.changeContent(index),
      }),
    });
  }

  private changeContent(index: number): Block {
    let contentComponent;

    switch (index) {
      case 0:
        contentComponent = new ProfileInfo({});
        break;
      case 1:
        contentComponent = new ProfileEdit({});
        break;
      case 2:
        contentComponent = new ProfilePassword({});
        break;
      default:
        break;
    }

    return contentComponent as Block;
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ProfileCard;
