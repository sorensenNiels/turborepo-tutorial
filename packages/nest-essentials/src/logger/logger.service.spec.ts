import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';

describe('Logger service', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: []
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log simple message', () => {
    service.log('Simple message');
  });

  it('should log exception', () => {
    const err = new Error('An error occurred');
    service.error(err);
  });

  it('should log a complex message object', () => {
    service.warn({ message: 'A warning is available' });
  });
});
