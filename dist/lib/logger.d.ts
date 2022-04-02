import { Environment } from '@srclaunch/types';
import { AnalyticsEventProps, CriticalEventProps, DebugEventProps, ExceptionEventProps, HttpEventProps, InfoEventProps, WarningEventProps } from '../types/events';
import { LoggerConfig } from '../types/index';
export declare class Logger {
    private readonly level;
    readonly environment?: Environment;
    constructor(config?: LoggerConfig);
    analytics(props: AnalyticsEventProps): Record<string, unknown>;
    critical(props: CriticalEventProps): Record<string, unknown>;
    debug(props: DebugEventProps): Record<string, unknown>;
    exception(props: ExceptionEventProps): string;
    http(props: HttpEventProps): string;
    info(props: InfoEventProps): string;
    warning(props: WarningEventProps): Record<string, unknown>;
    private getCommonProps;
}
//# sourceMappingURL=logger.d.ts.map