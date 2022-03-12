import { Module } from '@nestjs/common';
import { LoggerModule as LoggerModulePino } from 'nestjs-pino';
import { ConfigModule, ConfigService, CONFIG_LOG_LEVEL } from '../config';
import {
  httpLoggerCustomAttributeKeys,
  httpLoggerCustomProps,
  httpLoggerGenReqId,
  loggerMixin
} from './logger.mixin';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  imports: [
    LoggerModulePino.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get(CONFIG_LOG_LEVEL),
          mixin: loggerMixin,
          customProps: httpLoggerCustomProps,
          customAttributeKeys: httpLoggerCustomAttributeKeys,
          genReqId: httpLoggerGenReqId
        }
      }),
      providers: []
    })
  ],
  exports: [LoggerService]
})
export class LoggerModule {}
