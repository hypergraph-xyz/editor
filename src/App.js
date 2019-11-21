import React from 'react'
import { Wax, CreateSchema } from 'wax-prosemirror-core'
import { DefaultSchema } from 'wax-prosemirror-schema'

const options = {
  schema: new CreateSchema(DefaultSchema)
}

function App() {
  return (
    <Wax options={options} autoFocus placeholder="Type something..." debug />
  )
}

export default App
