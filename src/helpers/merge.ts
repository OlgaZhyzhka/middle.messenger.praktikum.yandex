import { PlainObject } from '@/utils/types';

const isObject = (item: unknown): item is PlainObject =>
  typeof item === 'object' && item !== null && !Array.isArray(item);

const merge = (lhs: PlainObject, rhs: PlainObject): PlainObject => {
  const stack = [{ lhs, rhs }];

  while (stack.length > 0) {
    const { lhs: lhsInner, rhs: rhsInner } = stack.pop()!;

    Object.keys(rhsInner).forEach((key) => {
      const rhsValue = rhsInner[key];
      if (isObject(rhsValue)) {
        if (!isObject(lhsInner[key])) {
          lhsInner[key] = {} as PlainObject;
        }
        stack.push({ lhs: lhsInner[key] as PlainObject, rhs: rhsValue });
      } else {
        lhsInner[key] = rhsValue;
      }
    });
  }

  return lhs;
}

export default merge;
