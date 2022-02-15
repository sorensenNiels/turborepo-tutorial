import cuid from 'cuid';
import { Request, Response } from 'express';
import { IncomingMessage } from 'http';
import _ from 'lodash';
import { JsonObject } from 'type-fest';
import {
  CONTEXT_ACCESS_TOKEN,
  CONTEXT_REQUEST_ID,
  CONTEXT_TENANT_ID
} from '../constants';
import { SessionMiddleware } from '../middlewares';

export const loggerMixin = (): JsonObject => {
  const ret: { requestId?: string; credentials?: JsonObject } = {};

  try {
    const credentials: {
      tenantId?: string;
      accessToken?: string;
    } = {};

    const tenantId = SessionMiddleware.get(CONTEXT_TENANT_ID);
    const accessToken = SessionMiddleware.get(CONTEXT_ACCESS_TOKEN);
    const requestId = SessionMiddleware.get(CONTEXT_REQUEST_ID);

    if (tenantId) credentials.tenantId = tenantId;
    if (accessToken) credentials.accessToken = accessToken;
    if (requestId) ret.requestId = requestId;

    if (!_.isEmpty(credentials)) {
      ret.credentials = credentials;
    }
  } catch (e) {
    // OK at this point indicating that the log entry did not contain any information from the SessionMiddleware
  }

  return ret;
};

const formatRequestPayload = (req: Request): string => {
  if (_.isPlainObject(req.body)) {
    return JSON.stringify({ ...req.body, ...req.query });
  }

  if (_.isString(req.body)) {
    return req.body;
  }

  return JSON.stringify(req.query);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const httpLoggerCustomProps = (
  req: Request,
  _res: Response
): Record<string, unknown> => ({
  context: 'accessLog',
  requestPayload: formatRequestPayload(req),
  route: req.params?.['0']
});

export const httpLoggerCustomAttributeKeys = {
  req: 'request',
  res: 'response',
  err: 'error',
  responseTime: 'timeTaken'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const httpLoggerGenReqId = (req: IncomingMessage): string =>
  SessionMiddleware.get(CONTEXT_REQUEST_ID) || cuid();
