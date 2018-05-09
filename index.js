const path = require('path')

const { app, BrowserWindow } = require('electron')

let MainWindow;

app.on('ready', () => {
  MainWindow = new BrowserWindow()  
  MainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  MainWindow.webContents.openDevTools()
})