import { app, BrowserWindow, ipcMain } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathresolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);
  // Antwort --> preload
  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });
});
