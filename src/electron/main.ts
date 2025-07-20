import { app, BrowserWindow } from "electron";
import { pollResource } from "./resourceManager.js";
import path from "path";
import { isDev } from "./util.js";
import { getPreLoadPath } from "./pathResolver.js";
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: getPreLoadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
  }
  pollResource(mainWindow);
});
