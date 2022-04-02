import {
  HttpRequest,
  HttpResponse,
  ISO8601String,
  Model,
  ModelField,
} from '@srclaunch/types';
import { ExceptionObject } from '@srclaunch/exceptions';

type CommonEventProps = {
  readonly created: ISO8601String;
  readonly environment: string;
  readonly id: string;
  readonly pii?: boolean;
};

type UserProps = {
  readonly country?: string;
  readonly email?: string;
  readonly id?: string;
  readonly ip_address?: string;
  readonly phone?: string;
  readonly province?: string;
};

export type CommonExceptionProps = ExceptionObject;

export type CriticalEventProps = CommonExceptionProps;

export type DataPointEventProps = CommonEventProps & {
  readonly model: {
    readonly name: Model['name'];
    readonly field: ModelField['name'];
  };
  readonly value: number;
};

export type DebugEventProps = {
  readonly message: string;
  readonly data?: unknown;
};

export type ExceptionEventProps = CommonExceptionProps;

export type HttpEventProps = {
  readonly request?: HttpRequest;
  readonly response?: HttpResponse;
};

export type InfoEventProps = string;

export type WarningEventProps = CommonExceptionProps;

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
  readonly user?: UserProps;
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
