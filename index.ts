import { RunBuildMode } from "./lib/RunBuildMode";
import { RunDevMode } from "./lib/RunDevMode";
import { RunApi } from "./lib/RunApi";


const devMode = process.argv.includes('-dev');
const buildMode = process.argv.includes('-build');

if (devMode) {
  await RunDevMode()
}

if (buildMode) {
  await RunBuildMode()
}

if (!devMode || !buildMode) {
  RunApi()
}
