const { ipcRenderer, remote } = require('electron')
require('devtron').install()

document.querySelector('#btn').addEventListener('click', () => {
  ipcRenderer.send('show-dialog', { type: 'info' })
})

document.querySelector('#btn2').addEventListener('click', () => {
  remote.dialog.showMessageBox(remote.getCurrentWindow(), {
    type: 'info',
    buttons: [],
    message: 'Hello, how are you?'
  })
})