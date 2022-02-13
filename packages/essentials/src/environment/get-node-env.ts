import { Environment } from './constants';

export const getNodeEnv = (): Environment =>
  (process.env.NODE_ENV as Environment) || Environment.development;
