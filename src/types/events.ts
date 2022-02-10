import {
  Model,
  ModelField,
  HttpRequest,
  HttpResponse,
  ISO8601String,
} from '@srclaunch/types';
// import { ExceptionObject } from '@srclaunch/exceptions';

type CommonEventProps = {
  created: ISO8601String;
  environment: string;
  id: string;
  pii?: boolean;
};

type UserProps = {
  country?: string;
  email?: string;
  id?: string;
  ip_address?: string;
  phone?: string;
  province?: string;
};

// type CommonExceptionProps = ExceptionObject;

type CommonExceptionProps = {};

export type CriticalEventProps = CommonExceptionProps;

export type DataPointEventProps = CommonEventProps & {
  model: {
    name: Model['name'];
    field: ModelField['name'];
  };
  value: number;
};

export type DebugEventProps =
  | {
      message: string;
      data?: unknown;
    }
  | string;

export type ExceptionEventProps = CommonExceptionProps;

export type HttpEventProps = HttpRequest | HttpResponse;

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
  action?: {
    name: string;
  };
  browser?: {
    name?: string;
    version?: string;
  };
  device?: {
    type: DeviceType;
    resolution?: {
      height: number;
      width: number;
    };
  };
  type: AnalyticsEvent;
  referrer?: string;
  request: HttpRequest;
  user?: UserProps;
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
  interaction: SocialMediaInteraction;
  platform: SocialMediaPlatform;
};

export type SEOEventProps = CommonEventProps & {
  ranking?: {
    position?: number;
  };
};
