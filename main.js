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

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})

	// Build Menu
	let menuTemplate = [
		{
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
		},
		{
			label: 'Window',
			submenu: [
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Ctrl+Shift+I',
					click () {
						win.webContents.openDevTools()
					}
				}
			]
		}
	]
	let menu = Menu.buildFromTemplate(menuTemplate)
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function openFolderDialog () {
	dialog.showOpenDialog(win, {
		properties: ['openDirectory']
	}, function (filePath) {
		// read directory
		fs.readdir(filePath[0], (err, files) => {
			let arr = []

			// loop over files for mp3 audio
			for(let i = 0; i < files.length; i ++) {
				if (files[i].substr(-4) === '.mp3') {
					arr.push(files[i])
				}
			}
			let obj = {}
			obj.files = arr
			obj.path = filePath[0]
			win.webContents.send('sentMusicTracks', obj)
		})
	})
}
