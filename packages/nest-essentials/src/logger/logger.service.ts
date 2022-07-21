/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Inject, Injectable } from '@nestjs/common';
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService extends Logger {
  constructor(
    logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params
  ) {
    super(logger, params);
  }
}
