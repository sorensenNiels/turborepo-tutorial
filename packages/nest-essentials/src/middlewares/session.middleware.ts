import { Injectable, NestMiddleware } from '@nestjs/common';
import cls from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { CONTEXT_NAMESPACE } from '../constants';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  public static createDefault(): cls.Namespace {
    return (
      cls.getNamespace(CONTEXT_NAMESPACE) ||
      cls.createNamespace(CONTEXT_NAMESPACE)
    );
  }

  public static get<T = string>(key: string): T | string {
    const session = cls.getNamespace(CONTEXT_NAMESPACE);

    if (!session) {
      throw new Error(
        `SessionMiddleware::get - session namespace not initialized (key: ${key})`
      );
    }

    return session.get(key);
  }

  public static set(key: string, value: unknown): void {
    const session = cls.getNamespace(CONTEXT_NAMESPACE);

    if (!session) {
      throw new Error(
        `SessionMiddleware::set - session namespace not initialized  (key: ${key})`
      );
    }

    session.set(key, value);
  }

  public use(req: Request, res: Response, next: NextFunction): void {
    const session = SessionMiddleware.createDefault();
    session.run(async () => {
      next();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public static useRpc(next: NextFunction): void {
    const session = SessionMiddleware.createDefault();
    session.bind(async () => {
      next();
    });
  }
}
