'use strict'

const createServer = require('./server')
const open = require('open')

class Editor {
  constructor (path) {
    this.server = createServer(path)
  }

  open ({ silent }) {
    if (silent) {
      this.server.listen(() => {})
    } else {
      this.server.listen(() => {
        open(`http://localhost:${this.server.address().port}`)
      })
    }
  }
}

module.exports = Editor
