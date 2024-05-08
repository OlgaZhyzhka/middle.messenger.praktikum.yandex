import { PlainObject } from '@/utils/types';
import merge from "./merge";

const set = (object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown => {
  if (typeof object !== 'object') {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('must be string');
  }

  const result = path.split('.').reduceRight(
    (acc, key: string) => ({
      [key]: acc,
    }),
    value
  ) as PlainObject;
  return merge(object as PlainObject, result);
};

export default set;
