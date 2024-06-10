import Block, { Props } from '@/core/Block';
import { actions } from '@/store/actions';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import connect from '@/helpers/connect';
import { IStore } from '@/store';
import { holder } from '@/utils/constants';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class Contact extends Block {
  constructor(props: Props) {
    super(props, 'li');
    const { avatar, title } = props;
    this.setProps({
      avatar: new Avatar({
        attributes: { class: 'contact__avatar' },
        src: avatar ? `${RESOURCE_URL}${avatar}` : holder,
        alt: title,
        size: 'sm',
      }),
      events: {
        click: (event: Event): void => this.handleClick(event),
      },
    });
    this.updateActiveClass();
  }

  private handleClick(event: Event): void {
    event.preventDefault();
    actions.setActiveChatId(this.props.id as number);
    this.updateActiveClass();
  }

  private updateActiveClass(): void {
    const isActive = this.props.id === this.props.activeChatId;
    const baseClass = this.props.attributes?.class || '';
    const activeClass = isActive ? 'contact contact_active' : 'contact';
    this.setProps({ attributes: { class: `${baseClass} ${activeClass}` } });
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.activeChatId !== newProps.activeChatId) {
      this.updateActiveClass();
    }

    return true;
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({ activeChatId }: IStore) => ({
  activeChatId,
});

export default connect(mapStateToProps)(Contact);
