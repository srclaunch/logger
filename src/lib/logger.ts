import { Environment, LogLevel } from '@srclaunch/types';
import { Chalk } from 'chalk';
import { DateTime } from 'luxon';
// import { getBrowserEnvironment, getNodeEnvironment } from '@srclaunch/environment';
import { nanoid } from 'nanoid';

// import winston from 'winston';
// import { CloudWatchConfig } from '../types/cloudwatch';
import {
  AnalyticsEventProps,
  CriticalEventProps,
  DebugEventProps,
  LogEvent,
  ExceptionEventProps,
  HttpEventProps,
  InfoEventProps,
  WarningEventProps,
} from '../types/events';
import { LoggerConfig } from '../types/index';
import pc from 'picocolors';

// import { LogLevel } from '../types/levels';
// import { getCloudwatchTransport } from './cloudwatch.js';

export class Logger {
  private level: LogLevel;
  public readonly environment?: Environment;

  public constructor(config?: LoggerConfig) {
    this.environment = config?.environment;
    this.level = config?.level ?? LogLevel.Info;
  }

  public analytics(props: AnalyticsEventProps): LogEvent {
    const event = { ...props, ...this.getCommonProps() };

    console.info(event);

    return event;
  }

  public critical({
    cause,
    id,
    message,
    ...eventArgs
  }: CriticalEventProps): LogEvent {
    const props = this.getCommonProps();

    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${id}:${message} 
      ${pc.bgRed(pc.white(cause?.name))}`,
    };

    console.error(event.message);

    return event;
  }

  public debug({ data, message, ...eventArgs }: DebugEventProps): LogEvent {
    const props = this.getCommonProps();

    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${message} 
      ${pc.white(data)}`,
      ...this.getCommonProps(),
    };

    console.debug(event.message);

    return event;
  }
  public exception({
    message,
    cause,
    id,
    ...eventArgs
  }: ExceptionEventProps): LogEvent {
    const props = this.getCommonProps();

    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${id}:${message} 
      ${pc.red(cause?.name)}`,
    };

    console.error(event.message);

    return event;
  }

  public http({ request, response, ...eventArgs }: HttpEventProps): LogEvent {
    const { method, resource, details: requestDetails } = request ?? {};
    const { status, details: responseDetails } = response ?? {};

    const props = this.getCommonProps();
    const timeStamp = pc.white(`[${props.created}]`);
    const requestId = pc.bold(pc.yellow(`<${requestDetails?.id ?? '?'}>`));
    const requestMethod =
      status?.code === 200
        ? pc.blue(`${method?.toUpperCase()} ${status?.code}`)
        : pc.gray(`${method?.toUpperCase()} ${status?.code}`);
    const duration = pc.gray(`${responseDetails?.duration}ms`);
    const event = {
      ...props,
      ...eventArgs,
      message:
        `${timeStamp} ${requestId} ${requestMethod} ${resource} ${duration}`.replace(
          /\n\s+/g,
          '',
        ),
    };

    console.info(event.message);

    return event;
  }

  public info(message: InfoEventProps): LogEvent {
    const props = this.getCommonProps();

    const event = {
      ...props,
      message: `[${pc.blue(props.created)}] ${message}`,
    };

    console.info(event.message);

    return event;
  }

  public warning({
    cause,
    id,
    message,
    ...eventArgs
  }: WarningEventProps): LogEvent {
    const props = this.getCommonProps();

    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${id}:${message} 
      ${pc.yellow(message)}`,
    };

    console.warn(event);

    return event;
  }

  private getCommonProps() {
    return {
      created: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
      environment: this.environment?.id,
      id: nanoid(),
      level: this.level,
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
