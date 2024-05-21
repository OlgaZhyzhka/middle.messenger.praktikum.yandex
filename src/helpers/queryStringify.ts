export const queryStringify = (data: Record<string, unknown>): string => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Input must be an object.');
  }

  const params = Object.entries(data).reduce((acc: string[], [key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`));
    } else if (typeof value === 'object' && value !== null) {
      const nestedQueryString = queryStringify(value as Record<string, unknown>);
      nestedQueryString.split('&').forEach((param) => acc.push(`${encodeURIComponent(key)}[${param}]`));
    } else {
      acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
    return acc;
  }, []);

  return params.length > 0 ? `?${params.join('&')}` : '';
};
