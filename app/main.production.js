import { app, BrowserWindow, Menu } from "electron";

import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

app.on("ready", () => {
  let extensions = BrowserWindow.getDevToolsExtensions();
  ["React Developer Tools", "Redux DevTools"].forEach(v => {
    if (extensions.hasOwnProperty(v)) {
      BrowserWindow.removeDevToolsExtension(v);
    }
  });
});

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      devTools: false
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.on("context-menu", (e, props) => {
    const { x, y } = props;

    Menu.buildFromTemplate([{
      label: "Inspect element",
      click() {
        mainWindow.inspectElement(x, y);
      }
    }]).popup(mainWindow);
  });
});
