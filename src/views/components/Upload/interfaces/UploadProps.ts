import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface UploadProps extends Props {
  uploadId: string;
  reset?: Callback;
  onChange?: Callback;
  onSubmit?: Callback;
}