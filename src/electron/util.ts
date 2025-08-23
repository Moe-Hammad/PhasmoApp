import { ipcMain, WebContents } from "electron";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

// Frontend --> Backend
// Diese Funktion sorgt dass ich ein Key von EvenpaloadMapping nenne und anschließen den als Object mit gebe
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, () => handler());
}

// Backend --> Frontend
export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}
