const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (_: any, data: any) => {
      callback(data);
    });
  },
  getStaticData: () => console.log("static"),
});
