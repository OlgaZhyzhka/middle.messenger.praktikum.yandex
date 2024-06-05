import Block, { Props } from '@/core/Block';
import { Callback } from '@/utils/types';
import { Button } from '@/views/components/Button';
import { Upload } from '@/views/components/Upload';

import tpl from './tpl';

class ModalUploadAvatar extends Block {
  private file: File | null = null;

  constructor(props: Props) {
    super({
      ...props,
      attributes: { class: 'form form_horizontal' },
      uploadAvatar: new Upload({
        attributes: { class: 'modal__upload' },
        uploadId: 'avatar',
        onChange: (event: Event): void => this.handleChange(event),
      }),
      submitButton: new Button({
        attributes: { type: 'submit' },
        type: 'submit',
        size: 'md',
        variant: 'primary',
        shape: 'rounded',
        children: 'Save',
        onClick: (event: Event): void => this.handleSubmit(event),
      }),
      cancelButton: new Button({
        size: 'md',
        variant: 'primary-bordered',
        shape: 'rounded',
        children: 'Cancel',
        onClick: (event: Event): void => this.handleCancel(event),
      }),
    });
    this.file = null;
  }

  private resetUpload(): void {
    (this.children.uploadAvatar as Upload).reset();
  }

  private handleCancel(event: Event): void {
    event.preventDefault();
    this.resetUpload();
    (this.props.onCancel as Callback)?.();
  }

  private handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e): void => {
        const result = e.target?.result as string;
        const uploadPreview = this.children.uploadAvatar.getChild('uploadPreview') as Block;

        if (uploadPreview) {
          uploadPreview.setProps({
            attributes: { style: `background-image: url(${result})` },
          });
        }
      };

      reader.readAsDataURL(file);
      this.file = file;
      target.value = '';
    }
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.resetUpload();
    (this.props.onSubmit as Callback)?.(this.file);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ModalUploadAvatar;
