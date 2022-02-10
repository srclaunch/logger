// import winston from 'winston';
import { LogLevel } from '@srclaunch/types';

// export const LogLevels = [
//   {
//     color: 'orange',
//     name: LogLevel.Analytics,
//     priority: 0,
//   },
//   {
//     color: 'bold red whiteBG',
//     name: LogLevel.Critical,
//     priority: 1,
//   },
//   {
//     color: 'yellow',
//     name: LogLevel.Database,
//     priority: 7,
//   },
//   {
//     color: 'cyan',
//     name: LogLevel.Debug,
//     priority: 5,
//   },
//   {
//     color: 'white',
//     name: LogLevel.Event,
//     priority: 6,
//   },
//   {
//     color: 'red',
//     name: LogLevel.Exception,
//     priority: 2,
//   },
//   {
//     color: 'bold red whiteBG',
//     name: LogLevel.Fatal,
//     priority: 0,
//   },
//   {
//     color: 'magenta',
//     name: LogLevel.Http,
//     priority: 8,
//   },
//   {
//     color: 'blue italic',
//     name: LogLevel.Info,
//     priority: 4,
//   },
//   {
//     color: 'yellow',
//     name: LogLevel.Warning,
//     priority: 3,
//   },
// ];

export const LogLevels = {
  [LogLevel.Analytics]: {
    color: 'orange',
    priority: 7,
  },
  [LogLevel.Critical]: {
    color: 'bold red whiteBG',
    priority: 1,
  },
  [LogLevel.Debug]: {
    color: 'cyan',
    priority: 5,
  },
  [LogLevel.Exception]: {
    color: 'red',
    priority: 2,
  },
  [LogLevel.Http]: {
    color: 'magenta',
    priority: 6,
  },
  [LogLevel.Info]: {
    color: 'blue italic',
    priority: 4,
  },
  [LogLevel.Warning]: {
    color: 'yellow',
    priority: 3,
  },
};

// export interface LoggerLogLevelsInterface extends winston.Logger {
//   analytics: winston.LeveledLogMethod;
//   critical: winston.LeveledLogMethod;
//   debug: winston.LeveledLogMethod;
//   exception: winston.LeveledLogMethod;
//   http: winston.LeveledLogMethod;
//   info: winston.LeveledLogMethod;
//   warning: winston.LeveledLogMethod;
// }
