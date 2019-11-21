import React from 'react'
import { Wax, CreateSchema } from 'wax-prosemirror-core'
import { DefaultSchema } from 'wax-prosemirror-schema'
import useSWR from 'swr'

const options = {
  schema: new CreateSchema(DefaultSchema)
}

const fetcher = url => fetch(url).then(r => r.text())

const App = () => {
  const { data } = useSWR('/content', fetcher)
  if (!data) return null
  return (
    <Wax options={options} autoFocus value={data} debug />
  )
}

export default App
