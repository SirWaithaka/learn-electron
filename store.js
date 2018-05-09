const fs = require('fs')
const path = require('path')

const electron = require('electron')

class Store {
  constructor (opts) {
    // path to app's configuration files relative to user
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, opts.configName + '.json')
    this.data = parseDataFile(this.path, opts.defaults)
  }

  get (key) {
    return this.data[key]
  }
  set (key, val) {
    this.data[key] = val
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (err) {
    return defaults
  }
}

module.exports = Store
