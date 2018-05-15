<<<<<<< a80a021afc3bbfbe9d4dd16ba3019f20f4ce2747
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
=======
const fs = require('fs')
const path = require('path')
const url = require('url')

const {app, BrowserWindow, dialog, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({width: 800, height: 600})

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'src/index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Open the DevTools.
	win.webContents.openDevTools()

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})

	// Build Menu
	let menuTemplate = {
		label: 'File',
		submenu: [
			{
				label: 'Sound Control',
				accelerator: 'Ctrl+O',
				click () {
					openFolderDialog()
				}
			}
		]
	}
	let menu = Menu.buildFromTemplate([menuTemplate])
	Menu.setApplicationMenu(menu)
>>>>>>> Most of the heavy llifting is done
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

<<<<<<< a80a021afc3bbfbe9d4dd16ba3019f20f4ce2747
ipc.on('update-notify-value', (e, arg) => {
  win.webContents.send('targetPriceVal', arg)
})
=======
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function openFolderDialog () {
	dialog.showOpenDialog(win, {
		properties: ['openFile']
	}, function (filePath) {
		win.webContents.send('music-file-path', filePath[0])
	})
}
>>>>>>> Most of the heavy llifting is done
