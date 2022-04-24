/* eslint-disable promise/valid-params */
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { HTTP_EXCEPTION_FILTER_KEY } from '../constants';
import { ProblemDetail } from '../interfaces/problem-detail.type';
import { ProblemDetailsModule } from '../problem-details.module';
import {
  ProblemDetailsExceptionFilter as HttpExceptionFilter,
  PROBLEM_CONTENT_TYPE
} from './problem-details-exception.filter';

const mockJson = jest.fn();

const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson
}));

const mockType = jest.fn().mockImplementation(() => ({
  status: mockStatus
}));

const mockGetResponse = jest.fn().mockImplementation(() => ({
  type: mockType
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn()
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

function assertResponse(
  expectedStatus: number,
  expectedJson: ProblemDetail
): void {
  expect(mockType).toHaveBeenCalledWith(PROBLEM_CONTENT_TYPE);
  expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
  expect(mockJson).toHaveBeenCalledWith(expect.objectContaining(expectedJson));
}

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when used as a module with default parameters', () => {
    beforeAll(async () => {
      const modRef = await Test.createTestingModule({
        imports: [ProblemDetailsModule]
      }).compile();
      filter = modRef.get<HttpExceptionFilter>(HTTP_EXCEPTION_FILTER_KEY);
    });

    describe('default Http exceptions', () => {
      it('should map default exception when thrown with not parameters', () => {
        const status = HttpStatus.BAD_REQUEST;
        const expectation: ProblemDetail = {
          type: 'bad_request',
          status,
          title: 'Bad Request',
          detail: 'An error occurred'
        };

        filter.catch(new BadRequestException(), mockArgumentsHost);

        assertResponse(status, expectation);
      });

      it('should map default exception when thrown with error details', () => {
        const status = HttpStatus.FORBIDDEN;
        const message = 'you shall not pass!';

        const expectation: ProblemDetail = {
          title: 'Forbidden',
          status,
          type: 'forbidden',
          detail: message
        };

        filter.catch(new ForbiddenException(message), mockArgumentsHost);

        assertResponse(status, expectation);
      });

      it('should map default exception when thrown with error details and description', () => {
        const status = HttpStatus.FORBIDDEN;
        const title = 'Gandalf said';
        const details = 'you shall not pass!';

        const expectation: ProblemDetail = {
          title,
          detail: details,
          status,
          type: 'forbidden'
        };

        filter.catch(new ForbiddenException(details, title), mockArgumentsHost);

        assertResponse(status, expectation);
      });
    });

    describe('the generic HttpException', () => {
      it('should map HttpException response when called with a string', () => {
        const status = HttpStatus.I_AM_A_TEAPOT;
        const message = 'you shall not pass!';

        const expectation: ProblemDetail = {
          title: 'I Am A Teapot',
          detail: message,
          status,
          type: 'i_am_a_teapot'
        };

        filter.catch(new HttpException(message, status), mockArgumentsHost);

        assertResponse(status, expectation);
      });
    });
  });

  // describe('when overriding parameters', () => {
  //   const status = HttpStatus.I_AM_A_TEAPOT;
  //   const customErrorsMap = {
  //     [status]: 'some-problem-detail'
  //   };

  //   beforeAll(async () => {
  //     const modRef = await Test.createTestingModule({
  //       imports: [],
  //       providers: [
  //         {
  //           provide: HTTP_ERRORS_MAP_KEY,
  //           useValue: customErrorsMap
  //         },
  //         {
  //           provide: BASE_PROBLEMS_URI_KEY,
  //           useValue: 'http://fcmam5.me/problems'
  //         },
  //         {
  //           provide: HTTP_EXCEPTION_FILTER_KEY,
  //           useClass: HttpExceptionFilter
  //         }
  //       ]
  //     }).compile();

  //     filter = modRef.get<HttpExceptionFilter>(HTTP_EXCEPTION_FILTER_KEY);
  //   });
  // });

  describe('when used outside a module', () => {
    beforeAll(() => {
      filter = new HttpExceptionFilter();
    });

    it('should map default exception when thrown with not parameters', () => {
      const status = HttpStatus.BAD_REQUEST;
      const expectation: ProblemDetail = {
        title: 'Bad Request',
        status,
        type: 'bad_request',
        detail: 'An error occurred'
      };

      filter.catch(new BadRequestException(), mockArgumentsHost);

      assertResponse(status, expectation);
    });
  });
});
