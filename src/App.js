import React, { useState, useEffect } from 'react'
import { Wax } from 'wax-prosemirror-core'
import { EditoriaLayout } from 'wax-prosemirror-layouts'
import * as options from './EditoriaConfig'

const { fetch } = window

const App = () => {
  const [content, setContent] = useState(null)
  const [modified, setModified] = useState(false)

  const onChange = content => {
    setModified(true)
    setContent(content)
  }

  const load = async () => {
    const res = await fetch('/content')
    setContent(await res.text())
  }

  useEffect(() => load(), [])

  const save = async () => {
    setModified(false)
    await fetch('/content', {
      method: 'PUT',
      body: content
    })
  }

  if (content === null) return null

  return (
    <>
      <button onClick={save} disabled={!content || !modified}>
        Save
      </button>
      <Wax
        options={options}
        autoFocus
        value={content}
        debug
        onChange={onChange}
      >
        {({ editor, view, ...props }) => (
          <EditoriaLayout editor={editor} view={view} {...props} />
        )}
      </Wax>
    </>
  )
}

export default App
