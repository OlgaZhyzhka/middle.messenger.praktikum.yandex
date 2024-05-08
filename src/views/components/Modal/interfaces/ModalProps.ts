import Block, { Props } from '@/core/Block';
import { Callback, SIZE } from '@/utils/types';

export interface ModalProps extends Props {
  title?: string;
  subTitle?: string;
  size?: SIZE;
  content: string | Block;
  open?: Callback;
  close?: Callback;
}
