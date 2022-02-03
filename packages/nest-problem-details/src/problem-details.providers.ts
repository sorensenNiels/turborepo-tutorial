import { Provider } from '@nestjs/common';
import {
  BASE_PROBLEMS_URI_KEY,
  defaultHttpErrors,
  HTTP_ERRORS_MAP_KEY,
  HTTP_EXCEPTION_FILTER_KEY
} from './constants';
import { ProblemDetailsExceptionFilter as HttpExceptionFilter } from './filters/problem-details-exception.filter';

export const BASE_PROBLEMS_URI: Provider = {
  provide: BASE_PROBLEMS_URI_KEY,
  useValue: ''
};

export const HTTP_ERRORS_MAP: Provider = {
  provide: HTTP_ERRORS_MAP_KEY,
  useValue: defaultHttpErrors
};

export const HTTP_EXCEPTION_FILTER: Provider = {
  provide: HTTP_EXCEPTION_FILTER_KEY,
  useClass: HttpExceptionFilter
};
