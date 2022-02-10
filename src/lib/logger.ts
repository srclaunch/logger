// import {
//   Environment,
//   // EnvironmentType
// } from '@srclaunch/types';
// import { getBrowserEnvironment, getNodeEnvironment } from '@srclaunch/environment';

// import { nanoid } from 'nanoid';
// import winston from 'winston';

// import { CloudWatchConfig } from '../types/cloudwatch';
import {
  AnalyticsEventProps,
  CriticalEventProps,
  DebugEventProps,
  ExceptionEventProps,
  HttpEventProps,
  InfoEventProps,
  WarningEventProps,
} from '../types/events';
import { LoggerConfig } from '../types/index';
// import { LoggerLogLevelsInterface } from '../types/levels';
// import { getCloudwatchTransport } from './cloudwatch.js';

export class Logger {
  // private logger: LoggerLogLevelsInterface;
  // public environment: Environment;

  public analytics(props: AnalyticsEventProps): void {
    // if (this.logger) {
    //   this.logger.analytics({
    //     ...this.getCommonProps,
    //     ...props,
    //   });
    // }
  }
  public critical(props: CriticalEventProps): void {
    // if (this.logger)
    //   this.logger.critical({ message: props, ...this.getCommonProps() });
  }
  public debug(props: DebugEventProps): void {
    // if (this.logger)
    //   this.logger.debug(
    //     typeof props === 'string'
    //       ? {
    //           message: props,
    //           ...this.getCommonProps(),
    //         }
    //       : { ...props, ...this.getCommonProps() },
    //   );
  }
  public async exception(props: ExceptionEventProps): Promise<void> {
    // const colors = global?.window
    //   ? {
    //       red: () => {
    //         console.log('color: red;', props);
    //       },
    //     }
    //   : null;

    console.log(props);

    // if (this.logger)
    // this.logger.exception({ message: props, ...this.getCommonProps() });
  }
  public http(props: HttpEventProps): void {
    // if (this.logger) this.logger.http({ ...props, ...this.getCommonProps() });
  }
  public async info(props: InfoEventProps): Promise<void> {
    // const colors = global?.window
    //   ? {
    //       blue: () => {
    //         console.log('color: blue;', props);
    //       },
    //     }
    //   : null;

    console.log(props);
  }
  public warning(props: WarningEventProps): void {
    // if (this.logger)
    // this.logger.warning({ ...this.getCommonProps(), message: props });
  }
  // private getCommonProps() {
  //   return {
  //     created: new Date().toString(),
  //     environment: this.environment.id,
  //     id: nanoid(),
  //   };
  // }

  constructor(config?: LoggerConfig) {
    // const transports = this.getEnvironmentTransports({
    //   cloudwatchConfig: config?.cloudwatchConfig,
    // });

    // winston.addColors({
    //   analytics: 'orange',
    //   critical: 'bold red whiteBG',
    //   debug: 'cyan',
    //   exception: 'red',
    //   http: 'magenta',
    //   info: 'blue italic',
    //   warning: 'yellow',
    // });

    // this.logger = <LoggerLogLevelsInterface>winston.createLogger({
    //   format: this.getFormatters().console,
    //   level: config?.level ?? this.getLogLevel(),
    //   levels: {
    //     analytics: 6,
    //     critical: 0,
    //     debug: 4,
    //     exception: 1,
    //     http: 5,
    //     info: 3,
    //     warning: 2,
    //   },
    //   // @ts-ignore
    //   transports,
    // });

    // this.environment = config?.environment ?? getBrowserEnvironment();
  }

  // private getLogLevel(): string {
  //   switch (this.environment.type) {
  //     case EnvironmentType.Development:
  //       return 'debug';
  //     case EnvironmentType.NonProduction:
  //       return 'debug';
  //     case EnvironmentType.Production:
  //       return 'warning';
  //   }
  // }

  // private getFormatters() {
  //   return {
  //     console: winston.format.combine(
  //       winston.format.timestamp({ format: 'hh:mm:ss' }),
  //       winston.format.colorize({ all: true }),
  //       winston.format.printf(event => {
  //         return `[${event.timestamp} - ${this.environment.id}] ${event.level}: ${event.message}`;
  //       }),
  //     ),
  //   };
  // }
  // private getEnvironmentTransports({
  //   cloudwatchConfig,
  // }: {
  //   cloudwatchConfig?: CloudWatchConfig;
  // }) {
  //   // const fileTransport = new winston.transports.File({ filename: 'combined.log' });
  //   // const consoleTransport = new winston.transports.Console();

  //   switch (this.environment.type) {
  //     case EnvironmentType.Development:
  //     // return [consoleTransport];
  //     case EnvironmentType.NonProduction:
  //     // return [consoleTransport];
  //     case EnvironmentType.Production:
  //       if (cloudwatchConfig) {
  //         const cloudWatchTransport = getCloudwatchTransport(cloudwatchConfig);

  //         return [cloudWatchTransport];
  //       }

  //       return [];
  //   }
  // }
}

export default Logger;
