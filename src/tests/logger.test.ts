import test from 'ava';
import { Logger } from '../lib/logger.js';
import { getEnvironment } from '@srclaunch/node-environment';

test('create new Logger instance', t => {
  const logger = new Logger();
  t.truthy(logger);
});

test('setting Logger environment', t => {
  const logger = new Logger({
    environment: getEnvironment(),
  });

  t.assert(logger.environment?.id === 'test');
});

test('logging to console', t => {
  const logger = new Logger({
    environment: getEnvironment(),
  });

  const result = logger.info('Test Info Log');

  t.truthy(result.includes('Test Info Log'));
});
