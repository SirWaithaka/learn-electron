const { remote } = require('electron')
const { ipcRenderer: ipc } = require('electron')

const closeBtn = document.querySelector('#closeBtn')

closeBtn.addEventListener('click', e => {
  let win = remote.getCurrentWindow()
  win.close()
})

const updateBtn = document.querySelector('#updateBtn')
updateBtn.addEventListener('click', e => {
  ipc.send('update-notify-value', document.querySelector('#notifyVal').value)

  let window = remote.getCurrentWindow()
  window.close()
})