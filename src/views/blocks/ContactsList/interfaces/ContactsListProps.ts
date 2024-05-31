import { Props } from '@/core/Block';

export interface ContactsListProps extends Props {
  onChatSelect?: (chatId: number) => Promise<void>;
}
