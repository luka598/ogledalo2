const { app, BrowserWindow, ipcMain } = require('electron')
const { spawn } = require('child_process');
const { v4 } = require('uuid');

var express = require('express');
var wserver = express();
wserver.use(express.json());

let callback = (data) => { }

wserver.post('/', function(request, response) {
  console.log(request.body);
  let message = request.body
  message.uuid = v4()
  message.time = new Date()
  message.image = undefined
  if (!message.username || !message.text) {
    response.send({ status: "Error" });
  } else {
    callback(message)
    response.send({ status: "Success" });
  }
});

wserver.listen(3000);

ipcMain.on('start-messages', (event) => {
  callback = (data) => {
    event.sender.send('user-message', data)
  }
})
