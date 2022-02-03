import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemDocument } from '../problem-document';

export class HttpBaseException extends HttpException {
  constructor(response: string | ProblemDocument, status: HttpStatus) {
    super(response, status);
  }

  getError() {
    const response = this.getResponse();

    if (response instanceof ProblemDocument) {
      return response.getError();
    }
  }
}
