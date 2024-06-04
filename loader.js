import fs from 'fs';
import tsConfigPaths from 'tsconfig-paths';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';

const tsconfig = JSON.parse(readFileSync(resolvePath(process.cwd(), 'tsconfig.json'), 'utf8'));

const { baseUrl, paths } = tsconfig.compilerOptions;

const absoluteBaseUrl = resolvePath(process.cwd(), baseUrl);

const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, context, defaultResolver) {
  const mappedSpecifier = matchPath(specifier);
  if (mappedSpecifier) {
    const tsPath = `${mappedSpecifier}.ts`;
    if (fs.existsSync(tsPath)) {
      specifier = tsPath;
    } else {
      specifier = mappedSpecifier;
    }
  }
  return defaultResolver(specifier, context, defaultResolver);
}
