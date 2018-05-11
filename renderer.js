const { remote } = require('electron')

// use `remote` require so that it's run in the context of the main process
const keytar = remote.require('keytar')

const getBtn = document.querySelector('#getBtn')
const setBtn = document.querySelector('#setBtn')
const secretVal = document.querySelector('#secretVal')
const output = document.querySelector('#output')

getBtn.addEventListener('click', e => {
  // get password from OS keychain
  // params { <service>, <account> }
  // returns a promise
  keytar.getPassword('KeytarTest', 'AccountName').then((secret) => {
    output.innerText = secret || 'Nothing Set'
  }).catch((err) => {
    console.log(err)
  })
})

setBtn.addEventListener('click', () => {
  const secret = secretVal.value
  // set password to OS keychain
  // params { <service>, <account>, <password> }
  keytar.setPassword('KeytarTest', 'craftsmon', secret).then((v) => {
    console.log(v)
  }).catch((err) => {
    console.log(err)
  })
})