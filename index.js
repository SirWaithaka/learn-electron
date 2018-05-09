const path = require('path')

const { app, BrowserWindow } = require('electron')

const Store = require('./store')

let MainWindow;

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: {
      height: 600,
      width: 800,
      x: 0, y: 0
    }
  }
})

app.on('ready', () => {
  MainWindow = new BrowserWindow(store.get('windowBounds'))

  function saveWindowBounds() {
    store.set('windowBounds', MainWindow.getBounds())
  }

  // listen to `resize` and `move` and save settings
  MainWindow.on('resize', saveWindowBounds)
  MainWindow.on('move', saveWindowBounds)
  
  MainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
})