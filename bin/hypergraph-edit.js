#!/usr/bin/env node
'use strict'
process.title = 'hypergraph-edit'

const Editor = require('..')

const path = process.argv[2]
if (!path) {
  console.error('Usage: hypergraph-edit PATH')
  process.exit(1)
}

const editor = new Editor(path)
editor.open()
