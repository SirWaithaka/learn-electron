const path = require('path')

const axios = require('axios')
const { remote } = require('electron')
const { ipcRenderer: ipc } = require('electron')

const BrowserWindow = remote.BrowserWindow

const notifyBtn = document.querySelector('#notifyBtn')
let price = document.querySelector('h1')
let targetPrice = document.querySelector('#targetPrice')
let targetPriceVal

const notification = {
  title: 'BTC Alert',
  body: 'BTC just beat your target price',
  icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
  axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD")
    .then(res => {
      const cryptos = res.data.BTC.USD
      price.innerHTML = `$${cryptos.toLocaleString('en')}`

      if (targetPrice.innerHTML != '' && targetPriceVal < cryptos) {
        const myNotification = new window.Notification(notification.title, notification)
      }
    })
}
getBTC()
setInterval(getBTC, 10000)

notifyBtn.addEventListener('click', (e) => {
  const modalPath = path.join('file://', __dirname, 'add.html')
  let win = new BrowserWindow({ frame: false, alwaysOnTop: true, transparent: true, height: 200, width: 400 })
  win.on('closed', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

ipc.on('targetPriceVal', (e, arg) => {
  targetPriceVal = Number(arg)
  targetPrice.innerHTML = `$${targetPriceVal.toLocaleString('en')}`
})