import {
  BuildFormat,
  BuildPlatform,
  BuildTarget,
  BuildTool,
  ProjectType,
  TestReporter,
  TestTool,
} from '@srclaunch/types';

export default {
  name: '@srclaunch/logger',
  description: 'Logging utilties',
  type: ProjectType.Library,
  build: {
    bundle: {
      exclude: ['chalk'],
    },
    formats: [BuildFormat.ESM, BuildFormat.UMD],
    platform: BuildPlatform.Node,
    target: BuildTarget.ESNext,
    tool: BuildTool.Vite,
  },
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    files: {
      include: ['src/**/*.test.ts'],
    },
    tool: TestTool.Ava,
    verbose: true,
  },
};
