// import { getLoggerMiddleware } from './lib/express-middleware.js';
import Logger from './lib/logger.js';
import { CloudWatchConfig } from './types/cloudwatch';
import { LoggerConfig } from './types/index';
// export { getLoggerMiddleware };
export default Logger;
export { Logger };
export type { CloudWatchConfig, LoggerConfig };
