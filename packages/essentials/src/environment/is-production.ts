import { EnvironmentType } from './constants';

export const isProduction = () =>
  process.env.NODE_ENV === EnvironmentType.production;
