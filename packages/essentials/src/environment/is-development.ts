import { EnvironmentType } from './constants';

export const isDevelopment = () =>
  !!(typeof process.env.NODE_ENV !== 'string') ||
  process.env.NODE_ENV === EnvironmentType.development;
