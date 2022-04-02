import { Environment, LogLevel } from '@srclaunch/types';
import chalk from 'chalk';
// import { getBrowserEnvironment, getNodeEnvironment } from '@srclaunch/environment';
import { nanoid } from 'nanoid';

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
// import { LogLevel } from '../types/levels';
// import { getCloudwatchTransport } from './cloudwatch.js';

export class Logger {
  private readonly level: LogLevel;
  public readonly environment?: Environment;

  public constructor(config?: LoggerConfig) {
    this.environment = config?.environment;
    this.level = config?.level ?? LogLevel.Info;
  }

  public analytics(props: AnalyticsEventProps): void {
    console.info({ ...this.getCommonProps(), ...props });
  }
  public critical(props: CriticalEventProps): void {
    console.error({ ...props, ...this.getCommonProps() });
  }
  public debug(props: DebugEventProps): void {
    console.debug({ ...props, ...this.getCommonProps() });
  }
  public exception(props: ExceptionEventProps): void {
    const message = `[${chalk.blue(props?.created)}]
    ${props.id}:${props.message} 
    ${chalk.red(props.cause)}`;

    // TODO: Send this to logging server
    // const data = {
    //     message: message,
    //     ...this.getCommonProps(),
    //     ...props,
    //   };
    console.error(message);
  }

  public http(props: HttpEventProps): void {
    const { details, method, resource } = props.request ?? {};
    const { status } = props.response ?? {};

    const message = `[${chalk.blue(details?.date)}]
      ${method}:${resource} 
      ${chalk.red(status?.code)}`;

    // TODO: Send this to logging server
    // const data = {
    //   message: message,
    //   ...this.getCommonProps(),
    //   ...props,
    // };

    console.info(message);
  }

  public info(props: InfoEventProps): void {
    const message = `[${chalk.blue(new Date().toISOString())}] ${props}`;

    console.info(message);
  }

  public warning(props: WarningEventProps): void {
    console.warn({ ...this.getCommonProps(), ...props });
  }

  private getCommonProps() {
    return {
      created: new Date().toString(),
      environment: this.environment?.id,
      id: nanoid(),
    };
  }

  // private getLogLevel(): string {
  //   switch (this.environment?.type) {
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
