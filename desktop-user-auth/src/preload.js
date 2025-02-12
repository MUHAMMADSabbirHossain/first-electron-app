// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";


// contextBridge.exposeInMainWorld("electronAPI", "tesitng electronAPI contextBridge");


// ipcRenderer.on('webContentsSend', (event, data) => {
//     console.log(data);
// })

// ipcRenderer.invoke('preloaderToMain', "preloaderToMain testing...");


// contextBridge.exposeInMainWorld('bridge', {
//     send: (data) => {
//         console.log("send api for contextBridge ", data);
//         const response = await ipcRenderer.invoke('input-data', data);
//         console.log({ response }); 
//     }

// })


contextBridge.exposeInMainWorld('bridge', {
    formData: async (data) => {
        console.log("form data: ", data);

        const response = await ipcRenderer.invoke('formdata', data);
        console.log(response);

        return response;
    }
});