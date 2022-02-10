// import WinstonCloudWatch from 'winston-cloudwatch';

export function getCloudwatchTransport({
  awsAccessKeyId,
  awsRegion,
  awsSecretKey,
  level: logLevel,
  logGroupName,
  logStreamName,
  retentionInDays = 90,
}: {
  awsAccessKeyId: string;
  awsRegion: string;
  awsSecretKey: string;
  level?: string;
  logGroupName: string;
  logStreamName: string;
  retentionInDays?: number;
}) {
  // : WinstonCloudWatch
  // const cloudwatchConfig =
  //   // : WinstonCloudWatch.CloudwatchTransportOptions
  //   {
  //     awsAccessKeyId,
  //     awsRegion,
  //     awsSecretKey,
  //     level: logLevel,
  //     logGroupName,
  //     logStreamName,
  //     messageFormatter: ({
  //       level,
  //       message,
  //       meta,
  //     }: {
  //       level: string;
  //       message: string;
  //       meta?: string;
  //     }): string =>
  //       `[${level}] : ${message} ${JSON.stringify(meta, undefined, 2)}}`,
  //     name: 'CloudwatchTransport',
  //     retentionInDays,
  //   };
  // return new WinstonCloudWatch(cloudwatchConfig);
}
