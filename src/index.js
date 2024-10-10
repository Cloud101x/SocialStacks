import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      nodeIntegration: true,
      contextIsolation: true,  // Enable context isolation
      enableRemoteModule: false,
      webviewTag: true
    }
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
});

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/dashboard2.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle login success and switch to the dashboard page
ipcMain.on('login-success', () => {
  mainWindow.loadURL(`file://${__dirname}/dashboard.html`);
});

// Handle logout and switch back to the login page
ipcMain.on('logout', () => {
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// Handle proceed and switch to the social page
ipcMain.on('proceed', () => {
  mainWindow.loadURL(`file://${__dirname}/dashboard2.html`);
});

// In this file, you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
