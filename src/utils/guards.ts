import { ApiError } from './interfaces';

export const isAPIError = (data: unknown): data is ApiError =>
  !!data && data !== null && typeof data === 'object' && 'reason' in data;
