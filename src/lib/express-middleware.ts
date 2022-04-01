import chalk from 'chalk'; // or you can use the require('chalk') syntax too
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import { Logger } from './logger';

export function getExpressMiddleware(
  logger: Logger,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('req', req);

  morgan(
    ':method :url -> :status :req[x-request-id]  (:res[content-length]kb/:response-time ms)',
  );

  return next();
}
