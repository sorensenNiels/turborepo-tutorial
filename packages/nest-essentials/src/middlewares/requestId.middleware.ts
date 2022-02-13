import { Injectable, NestMiddleware } from '@nestjs/common';
import cuid from 'cuid';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { CONTEXT_REQUEST_ID, HTTP_HEADER_REQUEST_ID } from '../constants';
import { SessionMiddleware } from './session.middleware';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    // make sure this is lower-cased, otherwise downstream stuff will barf.
    const lowerRequestId = _.toLower(HTTP_HEADER_REQUEST_ID);

    const requestIdHeader = req.header(lowerRequestId) || cuid();

    SessionMiddleware.set(CONTEXT_REQUEST_ID, requestIdHeader);

    req.headers[lowerRequestId] = requestIdHeader;

    res.set(HTTP_HEADER_REQUEST_ID, requestIdHeader);

    next();
  }
}
