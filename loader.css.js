// import fs from 'fs';
// import { fileUrlToPath } from 'node:url';

export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);
 
  if (!specifier.endsWith('.css')) {
    return nextResult;
  }

  return {
    url: nextResult.url,
    format: 'css',
    shortCircuit: true,
  };
}

export async function load(url, context, next) {
  if (context.format !== 'css') {
    return await next(url, context);
  }

  return {
    format: 'module',
    shortCircuit: true,
    source: ''
  };
}
