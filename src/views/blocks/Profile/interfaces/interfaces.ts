import { Props } from '@/core/Block';
import { UserDTO } from '@/utils/interfaces';

export interface ProfileProps extends Props {
  currentUser?: UserDTO;
}
