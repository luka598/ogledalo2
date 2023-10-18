const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  startMessages: ipcRenderer.send('start-messages'),
  setMessageCallback: (callback) => ipcRenderer.on('user-message', (event, data) => { callback(data) })
})
