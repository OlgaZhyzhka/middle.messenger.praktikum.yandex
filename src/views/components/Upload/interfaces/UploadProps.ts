import { Props } from '@/core/Block';
import { EventCallback } from '@/utils/types';

export interface UploadProps extends Props {
  uploadId: string;
  reset?: EventCallback;
  onChange?: EventCallback;
  onSubmit?: EventCallback;
}
