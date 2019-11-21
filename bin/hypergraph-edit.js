#!/usr/bin/env node
'use strict'
process.title = 'hypergraph-edit'

const server = require('../server')
const open = require('open')

server.listen(() => {
  open(`http://localhost:${server.address().port}`)
})