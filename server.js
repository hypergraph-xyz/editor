
'use strict'

const http = require('http')

const server = http.createServer((req, res) => {
  res.end('DATA')
})

server.listen(8080)
