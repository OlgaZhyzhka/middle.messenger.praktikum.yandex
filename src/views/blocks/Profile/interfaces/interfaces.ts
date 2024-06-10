import { Props } from '@/core/Block';
import { User } from '@/utils/interfaces';

export interface ProfileProps extends Props {
  currentUser?: User | null;
}
