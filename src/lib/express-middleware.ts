export default {}
// import { 
  // HttpRequestMethod, 
  // LogLevel } from '@srclaunch/types';
// import { getEnvironmentVariable } from '@srclaunch/environment';
// import { Handler } from 'express';
// import morgan,
//  { 
// //   //  StreamOptions 
//   } from 'morgan';

// import { MiddlewareConfig } from '../types/middleware';
// import Logger from './logger.js';

// const logger = new Logger({
//   level: getEnvironmentVariable('LOG_LEVEL') ?? LogLevel.Info,
// });

// export function getLoggerMiddleware(config?: MiddlewareConfig): Handler {
//   const stream: StreamOptions = {
//     write: (props: string) => {
//       logger.http({
//         id: props.split(' ')[4],
//         method: props.split(' ')[0] as HttpRequestMethod,
//         resource: props.split(' ')[1],
//         status: {
//           code: Number.parseInt(props.split(' ')[3]),
//         },
//       });
//     },
//   };

  // return morgan(
  //   ':method :url -> :status :req[x-request-id]  (:res[content-length]kb/:response-time ms)',
  //   // { stream },
  // );

  // return console.log()
// }
