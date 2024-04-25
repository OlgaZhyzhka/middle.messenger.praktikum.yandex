import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface InputProps extends Props {
  attributes?: Record<string, string | boolean>;
  inputAttributes?: Record<string, string | boolean>;
  onBlur?: Callback;
  onInput?: Callback;
  onChange?: Callback;
}
