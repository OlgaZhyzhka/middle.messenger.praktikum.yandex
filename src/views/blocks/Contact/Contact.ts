import Block, { Props } from '@/core/Block';
import { actions } from '@/store/actions';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import { Callback } from '@/utils/types';
import { holder } from '@/utils/constants';
import { Avatar } from '@/views/components/Avatar';

import tpl from './tpl';

class Contact extends Block {
  constructor(props: Props) {
    super(props, 'li');
    const { avatar, title } = props;
    this.setProps({
      attributes: { class: `${this.props.attributes?.class || ''} contact`.trim() },
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
    (this.props.onClick as Callback)?.(this.props.id as number);
  }

  public updateActiveClass(): void {
    const isActive = this.props.id === actions.getActiveChatId();
    const activeClass = 'contact_active';
    let className = this.props.attributes?.class || '';
    className = typeof className === 'string' ? className.replace(activeClass, '').trim() : '';

    if (isActive) {
      className += ` ${activeClass}`;
    }

    this.setProps({ attributes: { class: `${className}` } });
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Contact;
