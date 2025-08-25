import { app, BrowserWindow, ipcMain } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathresolver.js";
import { Low } from "lowdb";
import { connection } from "../db/connection.js";

// Datenbank anbindung
let db: Low<Ghost[]>;

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  console.log("Vor Db");
  const db = await connection(app);

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  // pollResources(mainWindow);
  // Antwort --> preload
  // ipcMainHandle("getStaticData", () => {
  //   return getStaticData();
  // });
});
