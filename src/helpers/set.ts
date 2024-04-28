import { Indexed } from "@/utils/types";
import merge from "./merge";

const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
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
  ) as Indexed;
  return merge(object as Indexed, result);
}

export default set;
