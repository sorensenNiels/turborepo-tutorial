import { EnvironmentType } from './constants';

export const isTest = () => process.env.NODE_ENV === EnvironmentType.test;
