const { app, BrowserWindow } = require("electron");
const path = require('path')
app.disableHardwareAcceleration();
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        title: "Angular and Electron",
        resizable: true,
        webPreferences: {
         //preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true,

        }
    });

    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    var splash = new BrowserWindow({
      width: 500,
      height: 300,
      transparent: true,
      frame: false,
      alwaysOnTop: true
    });

    splash.loadFile('splash.html');
  splash.center();
  setTimeout(function () {
    splash.close();
    appWin.center();
    appWin.show();
  }, 5000);

    //appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});
