export type SIZE = 'sm' | 'xs' | 'md' | 'lg' | 'xl';

export type VARIANT =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'icon'
  | 'primary-bordered';

export type SHAPE = 'round' | 'circle' | 'rounded' | 'default';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Callback = (...args: any[]) => void;