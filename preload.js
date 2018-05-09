const { ipcRenderer } = require('electron')

console.log('Webview renderer process, hi')

document.addEventListener('DOMContentLoaded', event => {
  for (let el of document.querySelectorAll('*')) {
    console.log(el.tagName)

    // send the info to the parent renderer
    ipcRenderer.sendTo(1, 'elFound', { tagName: el.tagName })
  }
})