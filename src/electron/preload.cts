const electron = require("electron");

// exposeInMainWorld für Renderer

electron.contextBridge.exposeInMainWorld("electron", {
  getGhosts: () =>
    electron.ipcRenderer.invoke("get-ghosts") as Promise<Ghost[]>,
  getEveryThing: () =>
    electron.ipcRenderer.invoke("get-everything") as Promise<DBData>,
  filterGhosts: (criteria: GhostCriteria) =>
    electron.ipcRenderer.invoke("filter-ghosts", criteria) as Promise<Ghost[]>,
} as Window["electron"]);

// Adapters
// invoke is async Fetch = invoke
function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

// Static Data send as Payload with the key
function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
