import Block, { Props } from '@/core/Block.ts';
import { Sidebar } from '@/views/blocks/Sidebar';
import tpl from './tpl.ts';

class Settings extends Block {
  constructor(props: Props) {
    super({
      ...props,
      attributes: { class: 'page page_inner' },
      sidebar: new Sidebar({
        isMessenger: false,
        isSettings: true,
      }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Settings;
