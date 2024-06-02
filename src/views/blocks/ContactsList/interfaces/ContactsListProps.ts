import { Props } from '@/core/Block';
import { Callback } from '@/utils/types';

export interface ContactsListProps extends Props {
  onChatSelect?: Callback;
  filterContacts?: Callback;
}
