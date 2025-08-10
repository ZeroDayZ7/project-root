import pkg from '../../../package.json' with { type: 'json' };

export function getAppVersion(): string {
  return pkg.version || 'unknown';
}
