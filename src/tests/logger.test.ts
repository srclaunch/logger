import test from 'ava';
import { Logger } from '../lib/logger.js';
import { getEnvironment } from '@srclaunch/node-environment';
import { DateTime } from 'luxon';
import { HttpRequestMethod } from '@srclaunch/types';

test('create new Logger instance', t => {
  const logger = new Logger();
  t.truthy(logger);
});

// test('setting Logger environment', t => {
//   process.env.NODE_ENV = 'test';
//   const logger = new Logger({
//     environment: getEnvironment(),
//   });

//   console.log('getEnvironment()', getEnvironment());
//   t.assert(logger.environment?.id === 'test');
// });

test('logging info to console', t => {
  const logger = new Logger({
    environment: getEnvironment(),
  });

  const result = logger.info('Test Info Log');

  t.truthy(result.message?.includes('Test Info Log'));
});

test('logging HTTP request to console', t => {
  const now = DateTime.now();

  const logger = new Logger({
    environment: getEnvironment(),
  });
  const result = logger.http({
    request: {
      details: {
        date: now.toISO(),
        id: 'TEST_REQUEST_ID',
        size: 666,
      },
      host: 'test-host',
      method: HttpRequestMethod.Get,
      resource: '/test-resource',
    },
    response: {
      details: {
        date: now.toISO(),
        duration: 333,
        request: {
          id: 'TEST_REQUEST_ID',
        },
      },
      status: {
        code: 200,
      },
    },
  });

  t.truthy(result.message?.includes('GET 200'));
});
