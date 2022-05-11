import {
  BuildFormat,
  BuildPlatform,
  BuildTarget,
  BuildTool,
  CodeFormatterTool,
  CodeLinterTool,
  License,
  Project,
  ProjectType,
  PublishAccess,
  StaticTypingTool,
  TestReporter,
  TestTool,
  UniversalPackage,
} from "@srclaunch/types";

export default <Project>{
  name: "@srclaunch/logger",
  description: "Logging utilties",
  type: ProjectType.Library,
  environments: {
    development: {
      formatters: [CodeFormatterTool.Prettier],
      linters: [CodeLinterTool.ESLint],
      staticTyping: [StaticTypingTool.TypeScript],
    },
  },
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    tool: TestTool.Ava,
  },
  build: {
    formats: [BuildFormat.ESM, BuildFormat.UMD],
    platform: BuildPlatform.Browser,
    target: BuildTarget.ESNext,
    tool: BuildTool.Vite,
  },
  release: {
    publish: {
      access: PublishAccess.Public,
      license: License.MIT,
      registry: "https://registry.npmjs.org/",
    },
  },
  requirements: {
    node: ">=16",
    yarn: ">=3.2.0",
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
};
