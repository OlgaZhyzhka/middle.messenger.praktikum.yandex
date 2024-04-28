export const cloneDeep = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(cloneDeep) as unknown as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as unknown as T;
  }

  const copyObject: { [key: string]: unknown } = {};
  Object.keys(obj).forEach((key) => {
    copyObject[key] = cloneDeep((obj as { [key: string]: unknown })[key]);
  });

  return copyObject as T;
}
