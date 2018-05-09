const { ipcRenderer } = require('electron')

const webview = document.querySelector('#webview')
const btn = document.querySelector('#devtools')

btn.addEventListener('click', () => webview.openDevTools())

ipcRenderer.on('elFound', (e, props) => {
  console.log(`Message received from webview ${JSON.stringify(props)}`)
})