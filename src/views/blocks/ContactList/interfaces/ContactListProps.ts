import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface ContactListProps extends Props {
  onChatSelect?: Callback;
  filterContacts?: Callback;
}
