export interface MessageProps {
  id: string;
  user_id: string;
  content: string;
  time: string;
  type: string;
  incoming: boolean;
  isRead: boolean;
  mediaUrl?: string;
}
