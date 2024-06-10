import { Props } from '@/core/Block';
import { EventCallback } from '@/utils/types';

export interface InputProps extends Props {
  attributes?: Record<string, string | boolean>;
  inputAttributes?: Record<string, string | boolean>;
  onBlur?: EventCallback;
  onInput?: EventCallback;
  onChange?: EventCallback;
  onKeyDown?: EventCallback;
}
