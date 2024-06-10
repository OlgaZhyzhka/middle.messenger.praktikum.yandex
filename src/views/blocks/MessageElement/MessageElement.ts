import Block from '@/core/Block';
import { RESOURCE_URL } from '@/api/http/ApiUrl';
import { Icon } from '@/views/components/Icon';

import { MessageElementProps } from './interfaces/MessageElementProps';
import tpl from './tpl';

class MessageElement extends Block {
  constructor(props: MessageElementProps) {
    const { file, type } = props;
    const iconFile = new Icon({ iconName: 'file', size: 'sm' });
    let fileDisplay = '';

    if (type === 'file' && file) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { content_type, filename, path } = file;

      if (['image/jpeg', 'image/png', 'image/gif'].includes(content_type)) {
        const srcImg = `${RESOURCE_URL}${path}`;
        fileDisplay = `<span class="message__thumb"><img src="${srcImg}" alt="${filename}" /></span>`;
      } else {
        fileDisplay = `${iconFile}<span class="message__filename">${filename}</span>`;
      }
    }

    super(
      {
        ...props,
        attributes: {
          class: `${props.attributes?.class || ''} chat__item`.trim(),
        },
        iconRead: new Icon({ iconName: 'read', size: 'sm' }),
        fileDisplay,
      },
      'li'
    );
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default MessageElement;
