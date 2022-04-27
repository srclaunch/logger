import {
  HttpRequest,
  HttpResponse,
  ISO8601String,
  Model,
  ModelField,
} from '@srclaunch/types';
import { ExceptionObject } from '@srclaunch/exceptions';

export type LogEvent = {
  readonly context?: Record<string, unknown>;
  readonly created: ISO8601String;
  readonly environment?: string;
  readonly id: string;
  readonly message?: string;
  readonly pii?: boolean;
  readonly source?: string;
};

export type CommonEventProps = Omit<LogEvent, 'id' | 'created'>;
export type CriticalEventProps = CommonEventProps & ExceptionObject;

export type DataPointEventProps = CommonEventProps & {
  readonly model: {
    readonly name: Model['name'];
    readonly field: ModelField['name'];
  };
  readonly value: number;
};

export type ExceptionEventProps = CommonEventProps & ExceptionObject;

export type DebugEventProps = CommonEventProps & {
  readonly message: string;
  readonly data?: any;
};

export type HttpEventProps = CommonEventProps & {
  readonly request?: HttpRequest;
  readonly response?: HttpResponse;
};

export type InfoEventProps = string;

export type WarningEventProps = CommonEventProps & ExceptionObject;

export enum AnalyticsEvent {
  Action = 'action',
  PageEvent = 'page-event',
  PageLeave = 'page-leave',
  PageView = 'page-view',
  UserIdentified = 'user-identified',
}

export enum DeviceType {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Web = 'web',
}

export type AnalyticsEventProps = {
  readonly action?: {
    readonly name: string;
  };
  readonly browser?: {
    readonly name?: string;
    readonly version?: string;
  };
  readonly device?: {
    readonly type: DeviceType;
    readonly resolution?: {
      readonly height: number;
      readonly width: number;
    };
  };
  readonly type: AnalyticsEvent;
  readonly referrer?: string;
  readonly request: HttpRequest;
  // readonly user?: UserProps;
};

export enum SocialMediaPlatform {
  Facebook = 'facebook',
  Instagram = 'instagram',
  LinkedIn = 'linked-in',
  TikTok = 'tik-tok',
  Twitter = 'twitter',
}

export enum SocialMediaInteraction {
  Follow = 'follow',
  Like = 'like',
}

export type SocialMediaAnalyticsEventProps = CommonEventProps & {
  readonly interaction: SocialMediaInteraction;
  readonly platform: SocialMediaPlatform;
};

export type SEOEventProps = CommonEventProps & {
  readonly ranking?: {
    readonly position?: number;
  };
};
