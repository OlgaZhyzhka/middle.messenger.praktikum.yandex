import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface InputElementProps extends Props {
  inputAttributes?: Record<string, string | boolean>;
  isValid: boolean;
  onBlur?: Callback;
  onKeyDown?: Callback;
}
