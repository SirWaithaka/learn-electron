const path = require('path')

const { app, BrowserWindow, dialog, Menu } = require('electron')

let MainWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  MainWindow = new BrowserWindow()  
  MainWindow.loadURL(path.join('file://', __dirname, 'index.html'))

  let application_menu = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Ctrl+Z',
          role: 'undo'
        },
        {
          label: 'Open',
          accelerator: 'Ctrl+O',
          click () {
            dialog.showOpenDialog({ properties: ['openFile', 'openDirectories', 'multiSelections']})
          }
        }
      ]
    }
  ]

  menu = Menu.buildFromTemplate(application_menu)
  Menu.setApplicationMenu(menu)

  MainWindow.on('closed', () => {
    MainWindow = null
  })
})