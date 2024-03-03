const isObject = (object: unknown): boolean => object != null && typeof object === 'object';

const deepEqual = (object1: unknown, object2: unknown): boolean => {
  if (typeof object1 !== 'object' || object1 === null || typeof object2 !== 'object' || object2 === null) {
    return object1 === object2;
  }

  const keys1 = Object.keys(object1 as Record<string, unknown>);
  const keys2 = Object.keys(object2 as Record<string, unknown>);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => {
    const val1 = (object1 as Record<string, unknown>)[key];
    const val2 = (object2 as Record<string, unknown>)[key];
    const areObjects = isObject(val1) && isObject(val2);
    return areObjects ? deepEqual(val1, val2) : val1 === val2;
  });
};

export default deepEqual;
