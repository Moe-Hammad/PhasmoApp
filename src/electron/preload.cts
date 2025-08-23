const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    ipcOn("statistics", (stats: any) => {
      callback(stats);
    });
  },
  // Expect an Answer
  getStaticData: () => ipcInvoke("getStaticData"),
  // satisfies is used to define the type based on our global parameter
} satisfies Window["electron"]);

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
  electron.ipcRenderer.on(key, (_: any, payload: any) => callback(payload));
}
