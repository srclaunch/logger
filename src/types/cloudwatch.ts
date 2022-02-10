export type CloudWatchConfig = {
  awsAccessKeyId: string;
  awsRegion: string;
  awsSecretKey: string;
  level?: string;
  logGroupName: string;
  logStreamName: string;
  retentionInDays?: number;
};
