'use strict'

const createServer = require('./server')
const open = require('open')

class Editor {
  constructor (path) {
    this.server = createServer(path)
  }

  open ({ silent }) {
    this.server.listen(() => {
      if (!silent) {
        open(`http://localhost:${this.server.address().port}`)
      }
    })
  }
}

module.exports = Editor
