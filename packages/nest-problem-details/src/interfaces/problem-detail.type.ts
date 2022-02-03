import { JsonObject, JsonValue } from 'type-fest';
import { ErrorDetail } from './error-detail.type';

export type ProblemDetail = {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  internal?: JsonObject;
  errors?: ErrorDetail[];
  [key: string]: JsonValue | undefined;
};
