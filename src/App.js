import React, { useState, useEffect } from 'react'
import { Wax } from 'wax-prosemirror-core'
import { EditoriaLayout } from 'wax-prosemirror-layouts'
import * as options from './EditoriaConfig'
import styled, { createGlobalStyle } from 'styled-components'

const { fetch } = window

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    #root {
      height:100vh;
      width:100vw;
    }
  }
`;

const StyledWax = styled(Wax)`
  .wax-surface-scroll {
    height: ${props => (props.debug ? "50vh" : "100%")};
  }
`;

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
      <GlobalStyle />
      <button onClick={save} disabled={!content || !modified}>
        Save
      </button>
      <StyledWax
        options={options}
        autoFocus
        value={content}
        debug
        onChange={onChange}
      >
        {({ editor, view, ...props }) => (
          <EditoriaLayout editor={editor} view={view} {...props} />
        )}
      </StyledWax>
    </>
  )
}

export default App
