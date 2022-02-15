import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorDetail } from '../interfaces';
import { ProblemDocument } from '../problem-document';

export class HttpBaseException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(response: string | ProblemDocument, status: HttpStatus) {
    super(response, status);
  }

  getError(): ErrorDetail[] | undefined {
    const response = this.getResponse();

    if (response instanceof ProblemDocument) {
      return response.getError();
    }
  }
}
