'use strict'

const http = require('http')
const serveStatic = require('serve-static')
const fs = require('fs')

const createServer = path => {
  const serve = serveStatic(`${__dirname}/build`)

  return http.createServer((req, res) => {
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
}

module.exports = createServer

if (!module.parent) createServer(process.argv[2]).listen(8080)
