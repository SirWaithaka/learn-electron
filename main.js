const path = require('path')
const url = require('url')

const { app, BrowserWindow, Menu, shell } = require('electron')
const { ipcMain: ipc } = require('electron')

let win

function createWindow () {
  win = new BrowserWindow({ height: 600, width: 800 })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open DevTools
  win.webContents.openDevTools()

  // Emitted when the Window is closed
  win.on('closed', () => {
    win = null
  })

  let menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        { label: 'Adjust Notification Value' },
        {
          label: 'CoinMarketCap',
          click() {
            shell.openExternal('https://google.com')
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if ( win === null ) {
    createWindow ()
  }
})

ipc.on('update-notify-value', (e, arg) => {
  win.webContents.send('targetPriceVal', arg)
})
