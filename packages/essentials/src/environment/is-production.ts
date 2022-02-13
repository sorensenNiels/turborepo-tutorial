import { Environment } from './constants';

export const isProduction = (): boolean =>
  process.env.NODE_ENV === Environment.production;
