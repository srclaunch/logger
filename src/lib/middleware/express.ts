// or you can use the require('chalk') syntax too
import { HttpRequestMethod } from '@srclaunch/types';
import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';
import { Logger } from '../logger';

// const getActualRequestDurationInMilliseconds = (start: [number, number]) => {
//   const NS_PER_SEC = 1e9; //  convert to nanoseconds
//   const NS_TO_MS = 1e6; // convert to milliseconds
//   const diff = process.hrtime(start);

//   return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
// };

export function expressLoggerMiddleware(
  logger: Logger,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (logger) {
    // const start = process.hrtime();
    const now = DateTime.now();
    const requestId = req.headers['X-Request-Id']?.toString();

    logger.http({
      request: {
        details: {
          date: now.toISO(),
          id: requestId,
          size: Number.parseInt(
            req.headers['content-length']?.toString() ?? '0',
          ),
        },
        host: req.hostname,
        method: req.method as HttpRequestMethod,
        resource: req.url,
      },
    });
  }

  next();
}
