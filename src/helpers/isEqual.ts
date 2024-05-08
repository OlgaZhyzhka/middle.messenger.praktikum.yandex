import { isArray, isPlainObject } from "./typesUtils";

const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true;
  }

  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  if (
    typeof a === 'string' ||
    typeof a === 'boolean' ||
    (typeof a === 'number' && !Number.isNaN(a) && !Number.isNaN(b))
  ) {
    return a === b;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    if (!aKeys.every((key) => bKeys.includes(key) && isEqual(a[key], b[key]))) {
      return false;
    }

    return true;
  }

  return false;
}

export default isEqual;