import { PlainObject } from '@/utils/types';
import { isArrayOrObject, isPlainObject } from './typesUtils';

const getKey = (key: string, parentKey?: string): string => parentKey ? `${parentKey}[${key}]` : key;

const getParams = (data: PlainObject | [], parentKey?: string): [string, string][] => Object.entries(data).reduce((result, [key, value]) => {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
    return result;
  }, [] as [string, string][]);

export const queryString = (data: PlainObject): string => {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
};
