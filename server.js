
'use strict'

const http = require('http')

let content = 'DATA'

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)

  if (req.method === 'GET') {
    res.end(content)
  } else if (req.method === 'PUT') {
    let data = ''
    req.on('data', d => data += d.toString())
    req.on('end', () => {
      content = data
      res.end()
    })
  }
})

server.listen(8080)
