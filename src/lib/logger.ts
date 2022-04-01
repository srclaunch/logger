import { Environment, LogLevel } from '@srclaunch/types';
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

  public analytics(props: AnalyticsEventProps): void {
    console.info({ ...this.getCommonProps(), ...props });
  }
  public critical(props: CriticalEventProps): void {
    console.error({ ...props, ...this.getCommonProps() });
  }
  public debug(props: DebugEventProps): void {
    console.debug({ ...props, ...this.getCommonProps() });
  }
  public async exception(props: ExceptionEventProps): Promise<void> {
    console.error({ ...props, ...this.getCommonProps() });
  }
  public http(props: HttpEventProps): void {
    console.info({ ...this.getCommonProps(), ...props });
  }
  public async info(props: InfoEventProps): Promise<void> {
    console.info({ ...this.getCommonProps(), message: props });
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

  public constructor(config?: LoggerConfig) {
    this.environment = config?.environment;
    this.level = config?.level ?? 'info';
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
