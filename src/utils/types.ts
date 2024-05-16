import { METHODS } from "./enums";

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

export type EventCallback = (event: Event) => void;

export type PlainObject<T = unknown> = {
  [k in string]: T;
};


export type Options = {
  headers?: Record<string, string>;
  method?: METHODS;
  timeout?: number;
  data?: Record<string, unknown> | FormData | null;
  retries?: number;
  withCredentials?: boolean;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

export type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;