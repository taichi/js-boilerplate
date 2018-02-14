import { app, BrowserWindow, Menu } from "electron";

import electrondebugger from "electron-debug";
import installer, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from "electron-devtools-installer";

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

electrondebugger();

app.on("ready", () => {
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  return Promise.all(extensions.map(ext => installer(ext, forceDownload)))
    .then(names => console.log(`Added Extension:  ${names}`)) // eslint-disable-line
    .catch(err => console.error("An error occurred: ", err)); // eslint-disable-line
});

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  mainWindow.loadURL(`file://${__dirname}/index.development.html`);
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.openDevTools();
  mainWindow.webContents.on("context-menu", (e, props) => {
    const { x, y } = props;

    Menu.buildFromTemplate([
      {
        label: "Inspect element",
        click() {
          mainWindow.inspectElement(x, y);
        }
      }
    ]).popup(mainWindow);
  });
});
