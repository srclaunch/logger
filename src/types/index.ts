import { Environment, LogLevel } from '@srclaunch/types';

import { CloudWatchConfig } from './cloudwatch';

export type LoggerConfig = {
  readonly cloudwatchConfig?: CloudWatchConfig;
  readonly environment?: Environment;
  readonly level?: LogLevel;
};
