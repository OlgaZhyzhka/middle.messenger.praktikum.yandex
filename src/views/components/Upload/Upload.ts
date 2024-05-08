import Block from '@/core/Block';
import { Input } from '@/views/components/Input';
import { Icon } from '@/views/components/Icon';
import { UploadProps } from './interfaces/UploadProps';
import tpl from './tpl';

class Upload extends Block {
  constructor(props: UploadProps) {
    super(props);
    this.setProps({
      attributes: {
        class: `${props.attributes?.class || ''} upload`.trim(),
      },
      inputFile: new Input({
        attributes: { class: 'upload__input', id: props.uploadId, type: 'file', accept: 'image/*', hidden: true },
        onChange: (event: Event): void => props.onChange?.(event),
      }),
      uploadPreview: new Block({
        attributes: { class: 'upload__preview' },
      }),
      uploadIcon: new Icon({ iconName: 'upload', size: 'md', attributes: { class: 'upload__icon' } }),
    });
  }

  public reset(): void {
    const input = this.getChild('inputFile') as Input;
    const preview = this.getChild('uploadPreview') as Block;
    preview.getContent()?.removeAttribute('style');
    input.getContent()?.setAttribute('value', '');
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Upload;
