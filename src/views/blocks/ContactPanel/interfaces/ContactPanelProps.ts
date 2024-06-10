import { Props } from '@/core/Block';

export interface ContactPanelProps extends Props {
  onChatSelect?: (chatId: number) => Promise<void>;
}
