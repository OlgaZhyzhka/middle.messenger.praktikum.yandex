import { Props } from '@/core/Block';

export interface MessageProps extends Props {
  id: string;
  user_id: string;
  content: string;
  time: string;
  type: string;
  incoming: boolean;
  isRead: boolean;
  mediaUrl?: string;
}
