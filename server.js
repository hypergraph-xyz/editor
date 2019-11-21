'use strict'

const http = require('http')
const serveStatic = require('serve-static')

let content = 'DATA'

const serve = serveStatic(`${__dirname}/build`)

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)

  if (req.method === 'GET') {
    serve(req, res, () => {
      res.end(content)
    })
  } else if (req.method === 'PUT') {
    let data = ''
    req.on('data', d => (data += d.toString()))
    req.on('end', () => {
      content = data
      res.end()
    })
  }
})

server.listen(8080)
