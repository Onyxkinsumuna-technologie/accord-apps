const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");
function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800, title: "Accord",
    icon: path.join(__dirname, "..", "www", "icon-512.png"),
    webPreferences: { contextIsolation: true }
  });
  Menu.setApplicationMenu(null);
  const ext = (u) => /^(mailto:|tel:|https:)/.test(u);
  win.webContents.setWindowOpenHandler(({ url }) => { if (ext(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file:")) { e.preventDefault(); if (ext(url)) shell.openExternal(url); } });
  win.loadFile(path.join(__dirname, "..", "www", "index.html"));
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
