'use strict'

const http = require('http')
const serveStatic = require('serve-static')
const fs = require('fs')

const path = process.argv[2]
if (!path) {
  console.error('Usage: hypergraph-edit PATH')
  process.exit(1)
}

const serve = serveStatic(`${__dirname}/build`)

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)

  if (req.method === 'GET') {
    serve(req, res, () => {
      fs.readFile(path, 'utf8', (_, content) => {
        res.end(content || '')
      })
    })
  } else if (req.method === 'PUT') {
    req.pipe(fs.createWriteStream(path)).on('close', () => res.end())
  }
})

server.listen(8080)
