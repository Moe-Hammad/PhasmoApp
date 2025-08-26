import { app, BrowserWindow, ipcMain } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathresolver.js";
import { getEveryThing, getGhosts } from "../backend/GhostService.js";
import { connection } from "../db/connection.js";

// Datenbank anbindung

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  console.log("Vor Db");
  const db = await connection(app);

  // IPC-Handler registrieren
  ipcMain.handle("get-ghosts", async () => {
    return await getGhosts(db);
  });

  ipcMain.handle("get-everything", async () => {
    return await getEveryThing(db);
  });
  // ipcMain.handle("filter-ghosts", async (_event, criteria: GhostCriteria) => {
  //   return await filterGhosts(db, criteria);
  // });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(getUIPath());
  }
});
