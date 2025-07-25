import path from "path";
import { app } from "electron";
import { isDev } from "./util.js";
export function getPreLoadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs",
  );
}
