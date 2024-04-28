import { Indexed } from '@/utils/types';

const isObject = (item: unknown): item is Indexed => typeof item === 'object' && item !== null && !Array.isArray(item);

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const stack = [{ lhs, rhs }];

  while (stack.length > 0) {
    const { lhs: lhsInner, rhs: rhsInner } = stack.pop()!;

    Object.keys(rhsInner).forEach((key) => {
      const rhsValue = rhsInner[key];
      if (isObject(rhsValue)) {
        if (!isObject(lhsInner[key])) {
          lhsInner[key] = {} as Indexed;
        }
        stack.push({ lhs: lhsInner[key] as Indexed, rhs: rhsValue });
      } else {
        lhsInner[key] = rhsValue;
      }
    });
  }

  return lhs;
}

export default merge;
