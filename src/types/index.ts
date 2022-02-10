import { Environment } from '@srclaunch/types';


import { CloudWatchConfig } from './cloudwatch';

export type LoggerConfig = {
  cloudwatchConfig?: CloudWatchConfig;
  environment?: Environment;
  level?: string;
};
