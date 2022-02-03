import { JsonObject } from 'type-fest';
import { ErrorDetail } from '../interfaces';

export class ProblemDocumentDto {
  status!: number;
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  internal?: JsonObject;
  errors?: ErrorDetail[];
}
