import { Props } from '@/core/Block';

export interface ChatInputProps extends Props {
  onSendMessage: (message: string) => void;
}
