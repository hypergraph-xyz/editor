# Hypergraph Editor <img src="https://raw.githubusercontent.com/hypergraph-xyz/design/main/hypergraph-logomark-1024-square.png" align="right" height="64" />

The Hypergraph Editor, based on [Wax](https://gitlab.coko.foundation/wax/wax-prosemirror). This is a partnership between [Coko](https://coko.foundation) and [Liberate Science](https://libscie.org) (see announcement [here](https://blog.libscie.org/partnering-with-coko/)).

![Screenshot](screenshot.png)

## Installation

```bash
$ npm install -g @hypergraph-xyz/editor
```

## Usage

```bash
$ hypergraph-edit FILE
```

```js
const Editor = require('@hypergraph-xyz/editor')

const editor = new Editor('FILE')
editor.open()
```
