import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });


  ipcMain.handle('formdata', async (event, data) => {
    console.log(data);

    // let responseData = {
    //   x: 10,
    //   y: 5
    // };
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => response.json())
    //   .then(json => {
    //     console.log({ json })
    //     responseData = json;
    //     return json;
    //   })
    //   .catch(error => console.log({ error }));
    // response = json;
    // console.log({ responseData });
    // return responseData;

    // dummy response
    const response = await fetch(`http://localhost:5000/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    console.log({ json });

    if (!json.insertedId) {
      new Notification({
        title: `Something went wrong to register. ${json?.message}.`,
        body: 'Please try again. If the problem persists, please contact us.'
      }).show();

      return json;
    } else {
      new Notification({
        title: `You have successfully registered with Email: ${data?.email}`,
        body: 'You can login now',
      }).show();

      return json;
    }

  });

  // mainWindow.webContents.send('webContentsSend', 'webContents test ');

  // ipcMain.handle('preloaderToMain', (event, data) => {
  //   console.log(data);

  //  return "i data paisi"
  // });

  // ipcMain.handle('input-data', (event, data) => {
  //   console.log(data);
  // return{
  //   x:10,
  //   y:5
  // }
  // });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
