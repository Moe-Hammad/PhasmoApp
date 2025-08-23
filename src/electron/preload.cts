const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
      callback(stats);
    });
  },
  // Expect an Answer
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  // satisfies is used to define the type based on our global parameter
} satisfies Window["electron"]);
