import React, { Fragment, useState } from 'react'
import { Wax, CreateSchema } from 'wax-prosemirror-core'
import { DefaultSchema } from 'wax-prosemirror-schema'
import useSWR from 'swr'

const options = {
  schema: new CreateSchema(DefaultSchema)
}

const fetcher = url => fetch(url).then(r => r.text())

const App = () => {
  const [content, setContent] = useState(null)
  const [modified, setModified] = useState(false)

  const onChange = content => {
    setModified(true)
    setContent(content)
  }

  const { data } = useSWR('/content', fetcher)
  if (!data) return null

  const save = async () => {
    if (!content) return
    setModified(false)
    await fetch('/content', {
      method: 'PUT',
      body: content
    })
  }

  return (
    <Fragment>
      <button onClick={save} disabled={!content || !modified}>Save</button>
      <Wax options={options} autoFocus value={data} debug onChange={onChange} />
    </Fragment>
  )
}

export default App
