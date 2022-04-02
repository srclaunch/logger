import { Environment, LogLevel } from '@srclaunch/types';
import chalk from 'chalk';
import { DateTime } from 'luxon';
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

  public analytics(props: AnalyticsEventProps): Record<string, unknown> {
    const data = { ...props, ...this.getCommonProps() };

    console.info(data);

    return data;
  }
  public critical(props: CriticalEventProps): Record<string, unknown> {
    const data = { ...props, ...this.getCommonProps() };

    console.error(data);

    return data;
  }
  public debug(props: DebugEventProps): Record<string, unknown> {
    const data = { ...props, ...this.getCommonProps() };

    console.debug(data);

    return data;
  }
  public exception(props: ExceptionEventProps): string {
    const dt = DateTime.fromISO(
      props?.created ?? new Date().toISOString(),
    ).toFormat('yyyy-MM-dd HH:mm:ss');

    const message = `[${chalk.blue(dt)}]
    ${props.id}:${props.message} 
    ${chalk.red(props.cause)}`;

    // TODO: Send this to logging server
    // const data = {
    //     message: message,
    //     ...this.getCommonProps(),
    //     ...props,
    //   };
    console.error(message);

    return message;
  }

  public http(props: HttpEventProps): string {
    const { details, method, resource } = props.request ?? {};
    const { details: responseDetails, status } = props.response ?? {};
    const dt = DateTime.fromISO(
      details?.date ?? new Date().toISOString(),
    ).toFormat('yyyy-MM-dd HH:mm:ss');

    const message = `[${chalk.blue(dt)}] HTTP ${chalk.red(
      status?.code,
    )} -> ${chalk.red(method)}:${resource} (id: ${
      responseDetails?.id ?? ''
    } - ${responseDetails?.duration}ms - ${responseDetails?.size}kb)`.replace(
      /\n\s+/g,
      '',
    );

    // TODO: Send this to logging server
    // const data = {
    //   message: message,
    //   ...this.getCommonProps(),
    //   ...props,
    // };

    console.info(message);

    return message;
  }

  public info(props: InfoEventProps): string {
    const dt = DateTime.fromISO(new Date().toISOString()).toFormat(
      'yyyy-MM-dd HH:mm:ss',
    );

    const message = `[${chalk.blue(dt)}] ${props}`;

    console.info(message);

    return message;
  }

  public warning(props: WarningEventProps): Record<string, unknown> {
    const data = { ...this.getCommonProps(), ...props };
    console.warn(data);
    return data;
  }

  private getCommonProps() {
    const dt = DateTime.fromISO(new Date().toISOString()).toFormat(
      'yyyy-MM-dd HH:mm:ss',
    );

    return {
      created: dt,
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
