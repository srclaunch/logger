import {
  BuildFormat,
  BuildPlatform,
  BuildTarget,
  BuildTool,
  License,
  PackageAccess,
  Project,
  ProjectType,
  TestReporter,
  TestTool,
  UniversalPackage,
} from '@srclaunch/types';

export default {
  name: '@srclaunch/logger',
  description: 'Logging utilties',
  type: ProjectType.Library,
  build: {
    formats: [BuildFormat.ESM, BuildFormat.UMD],
    platform: BuildPlatform.Browser,
    target: BuildTarget.ESNext,
    tool: BuildTool.Vite,
  },
  release: {
    package: {
      publish: {
        access: PackageAccess.Public,
        license: License.MIT,
        registry: 'https://registry.npmjs.org/',
      },
    },
  },
  requirements: {
    node: '>=16',
    packages: [
      UniversalPackage.NanoID,
      UniversalPackage.Luxon,
      UniversalPackage.PicoColors,
    ],
    srclaunch: {
      dx: true,
      cli: true,
      types: true,
    },
  },
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    tool: TestTool.Ava,
  },
} as Project;
