import { Props } from '@/core/Block';
import { EventCallback } from '@/utils/types';

export interface InputElementProps extends Props {
  inputAttributes?: Record<string, string | boolean>;
  isValid: boolean;
  onBlur?: EventCallback;
  onKeyDown?: EventCallback;
}
