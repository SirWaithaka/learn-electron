const path = require('path')

const { app, BrowserWindow, dialog, ipcMain } = require('electron')

let MainWindow;

app.on('ready', () => {
  MainWindow = new BrowserWindow()  
  MainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  
  ipcMain.on('show-dialog', (e, { type }) => {
    dialog.showMessageBox(MainWindow, {
      type,
      buttons: [],
      message: 'Ghello, how are you?'
    })
  })
})