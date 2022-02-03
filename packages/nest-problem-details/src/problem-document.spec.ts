import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { isProduction } from '@packages/essentials';
import { JsonObject } from 'type-fest';
import { defaultHttpErrors } from './constants';
import { ProblemDocumentDto } from './dtos';
import { HttpBaseException } from './exceptions';
import { ProblemDocument } from './problem-document';

type ProblemDocuments = {
  [key: string]: ProblemDocumentDto;
};

const problemDocuments: ProblemDocuments = {
  requiredOnly: {
    status: HttpStatus.INTERNAL_SERVER_ERROR
  },
  requiredAndOptional: {
    type: defaultHttpErrors[HttpStatus.INTERNAL_SERVER_ERROR],
    title: 'Internal Server Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    detail: 'Failed to communicate with service back-end',
    instance: '/registration/123456'
  },
  minimum: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    detail: 'Error communicating with Synchronicer back-end'
  }
};

class CustomError extends Error {
  constructor(message?: string) {
    super();
    this.name = this.constructor.name;
    if (message) {
      this.message = message;
    }
  }
}

class SimpleOopsError extends HttpBaseException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

class AdvancedOopsError extends HttpBaseException {
  constructor(message: string, detailExtras?: JsonObject) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const problemDocument = ProblemDocument.create(
      {
        status,
        detail: message,
        // title: 'Oops error',
        type: 'oops_error'
      },
      { ...detailExtras }
    );
    super(problemDocument, status);
  }
}

const noFundsProblem = ProblemDocument.create(
  {
    type: 'out-of-credit',
    title: 'Out of credit',
    detail: 'Your current balance is 30, but the cost is 50.',
    instance: '/account/12345/msgs/abc',
    status: HttpStatus.FORBIDDEN
  },
  { balance: 30 }
);

class NoFundsException extends HttpException {
  constructor() {
    super(HttpException.createBody(noFundsProblem), HttpStatus.FORBIDDEN);
  }
}

describe('ProblemDetails', () => {
  it('it should be defined', () => {
    expect(ProblemDocument).toBeDefined();
  });

  describe('Using static create method', () => {
    it('it should create a basic problem document - required properties only', () => {
      const problemDocument = ProblemDocument.create(
        problemDocuments.requiredOnly
      );

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
    });

    it('it should create a basic problem document - to create a valid message', () => {
      const problemDocument = ProblemDocument.create(problemDocuments.minimum);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
      expect(response.detail).toBe(problemDocuments.minimum.detail);
    });

    it('it should create a basic problem document - with optional properties', () => {
      const problemDocument = ProblemDocument.create(
        problemDocuments.requiredAndOptional
      );

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.status).toBe(problemDocuments.requiredAndOptional.status);
      expect(response.type).toBe(problemDocuments.requiredAndOptional.type);
      expect(response.title).toBe(problemDocuments.requiredAndOptional.title);
      expect(response.detail).toBe(problemDocuments.requiredAndOptional.detail);
      expect(response.instance).toBe(
        problemDocuments.requiredAndOptional.instance
      );
    });

    it('it should create a basic problem document - with optional properties and extensions', () => {
      const problemDocument = ProblemDocument.create(
        problemDocuments.requiredAndOptional,
        {
          internal: { stack: 'here goes the stack' },
          registration: 123456
        }
      );

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.status).toBe(problemDocuments.requiredAndOptional.status);
      expect(response.type).toBe(problemDocuments.requiredAndOptional.type);
      expect(response.title).toBe(problemDocuments.requiredAndOptional.title);
      expect(response.detail).toBe(problemDocuments.requiredAndOptional.detail);
      expect(response.instance).toBe(
        problemDocuments.requiredAndOptional.instance
      );
      expect(response.registration).toBe(123456);

      if (process.env.NODE_ENV !== 'production') {
        expect(response.internal).toBeDefined();
        expect(response.internal).toEqual({ stack: 'here goes the stack' });
      } else {
        expect(response.internal).toBeUndefined();
      }
    });
  });

  describe('Using static from method passing Error', () => {
    it('it should create a problem document - from an error with no message', () => {
      const error = new Error();
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe('');
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });

    it('it should create a problem document - from an error with a message', () => {
      const message = 'A communication error occurred';
      const error = new Error(message);
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(message);
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });

    it('it should create a problem document - from a extended error with no message', () => {
      const error = new CustomError();
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe('');
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });

    it('it should create a problem document - from a extended error with a message', () => {
      const message = 'A communication error occurred';
      const error = new CustomError(message);
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(message);
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });
  });

  describe('Using static from method passing HttpException', () => {
    it('it should create a problem document - from an error with no message', () => {
      const error = new BadRequestException();
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();

      expect(response.type).toBe('bad_request');
      expect(response.title).toBe('Bad Request');
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.detail).toBe('An error occurred');

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });

    it('it should create a problem document - from an error with a message', () => {
      const message = 'The requested registration does not exist';
      const error = new BadRequestException(message);
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(message);
      expect(response.type).toBe('bad_request');
      expect(response.title).toBe('Bad Request');
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });

    it('it should create a problem document - from an error with a message and description', () => {
      const message = 'The requested registration does not exist';
      const description = 'Try again with another registration';
      const error = new BadRequestException(message, description);

      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(message);
      expect(response.type).toBe('bad_request');
      expect(response.title).toBe(description);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });

    it('it should create a problem document - from a extended error with only message', () => {
      const message = 'You are a fool';
      const error = new SimpleOopsError(message);
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(message);
      expect(response.type).toBe('internal_server_error');
      expect(response.title).toBe('Internal Server Error');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.internal).toBeUndefined();
    });

    it('it should create a problem document - from a extended error with a message', () => {
      const message = 'You are a fool';
      const extras = { foo: 'bar', answer: 42 };
      const error = new AdvancedOopsError(message, extras);
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(message);
      expect(response.type).toBe('oops_error');
      expect(response.title).toBe('Oops Error');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.foo).toBe('bar');
      expect(response.answer).toBe(42);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }

      problemDocument.logError();
    });
  });

  describe('Handle exception with problem', () => {
    it('it should correctly handle an exception with a problem document', () => {
      const error = new ForbiddenException(noFundsProblem);
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(
        'Your current balance is 30, but the cost is 50.'
      );
      expect(response.type).toBe('out-of-credit');
      expect(response.title).toBe('Out of credit');
      expect(response.status).toBe(HttpStatus.FORBIDDEN);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });
  });

  describe('Handle HttpException that throws ProblemDocument', () => {
    it('it should correctly handle an http exception thowing a payload with a ProblemDocument', () => {
      const error = new NoFundsException();
      const problemDocument = ProblemDocument.from(error);

      expect(problemDocument).toBeDefined();

      const response = problemDocument.createResponse();
      expect(response).toBeDefined();
      expect(response.detail).toBe(
        'Your current balance is 30, but the cost is 50.'
      );
      expect(response.type).toBe('out-of-credit');
      expect(response.title).toBe('Out of credit');
      expect(response.status).toBe(HttpStatus.FORBIDDEN);

      if (!isProduction()) {
        expect(response.internal).toBeDefined();
      } else {
        expect(response.internal).toBeUndefined();
      }
    });
  });
});
