import osUtils from "os-utils";
import fs from "fs";
import { BrowserWindow } from "electron";
const POLLING_INTERVAL: number = 500;
export function pollResource(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage: number = await getCpuUsage();
    const ramUsage: number = getRamUsage();
    const storage = getStorageData();
    mainWindow.webContents.send("statistics", {
      cpuUsage,
      ramUsage,
      storageUsage: storage.usage,
    });
  }, POLLING_INTERVAL);
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage((value: number) => resolve(value));
  });
}
function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}
function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;
  console.log(total / 1_000_000_000);
  console.log((total - free) / 1_000_000_000);
  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - Math.floor(free / 1_000_000_000) / total,
  };
}
