import { Environment } from './constants';

export const isTest = (): boolean => process.env.NODE_ENV === Environment.test;
