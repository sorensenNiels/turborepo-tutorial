import { Environment } from './constants';

export const isDevelopment = (): boolean =>
  !!(typeof process.env.NODE_ENV !== 'string') ||
  process.env.NODE_ENV === Environment.development;
