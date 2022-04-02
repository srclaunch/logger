import { Environment } from '@srclaunch/types';
import { AnalyticsEventProps, CriticalEventProps, DebugEventProps, LogEvent, ExceptionEventProps, HttpEventProps, InfoEventProps, WarningEventProps } from '../types/events';
import { LoggerConfig } from '../types/index';
export declare class Logger {
    private readonly level;
    readonly environment?: Environment;
    constructor(config?: LoggerConfig);
    analytics(props: AnalyticsEventProps): LogEvent;
    critical({ cause, id, message }: CriticalEventProps): LogEvent;
    debug({ data, message }: DebugEventProps): LogEvent;
    exception({ message, cause, id }: ExceptionEventProps): LogEvent;
    http({ request, response }: HttpEventProps): LogEvent;
    info(message: InfoEventProps): LogEvent;
    warning({ cause, id, message }: WarningEventProps): LogEvent;
    private getCommonProps;
}
//# sourceMappingURL=logger.d.ts.map