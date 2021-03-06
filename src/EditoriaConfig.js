import {
  toggleMark,
  wrapIn,
  setBlockType,
  joinUp,
  joinDown,
  lift
} from 'prosemirror-commands'

import {
  goToNextCell,
  tableNodes,
  columnResizing,
  tableEditing
} from 'prosemirror-tables'

import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem
} from 'prosemirror-schema-list'

import { emDash, ellipsis } from 'prosemirror-inputrules'

import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles'

import { CreateSchema, CreateShortCuts } from 'wax-prosemirror-core'
import { TrackChangePlugin } from 'wax-prosemirror-plugins'
import { EditoriaSchema } from 'wax-prosemirror-schema'

const extraNodes = {
  ...tableNodes({
    tableGroup: 'block',
    cellContent: 'block+'
  })
}

// CreateSchema
EditoriaSchema.nodes = { ...EditoriaSchema.nodes, ...extraNodes }
const schema = new CreateSchema(EditoriaSchema)

const shortCuts = {
  'Mod-b': toggleMark(schema.marks.strong),
  'Mod-i': toggleMark(schema.marks.em),
  'Mod-u': toggleMark(schema.marks.underline),
  'Mod-`': toggleMark(schema.marks.code),
  'Ctrl->': wrapIn(schema.nodes.blockquote),
  Enter: splitListItem(schema.nodes.list_item),
  'Mod-[': liftListItem(schema.nodes.list_item),
  'Mod-]': sinkListItem(schema.nodes.list_item),
  'Alt-ArrowUp': joinUp,
  'Alt-ArrowDown': joinDown,
  'Mod-BracketLeft': lift,
  Tab: goToNextCell(1),
  'Shift-Tab': goToNextCell(-1),
  'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
  'Shift-Ctrl-\\': setBlockType(schema.nodes.code_block),
  'Shift-Ctrl-8': wrapInList(schema.nodes.bullet_list),
  'Shift-Ctrl-9': wrapInList(schema.nodes.ordered_list),
  'Shift-Ctrl-1': setBlockType(schema.nodes.heading, { level: 1 }),
  'Shift-Ctrl-2': setBlockType(schema.nodes.heading, { level: 2 }),
  'Shift-Ctrl-3': setBlockType(schema.nodes.heading, { level: 3 }),
  'Shift-Ctrl-4': setBlockType(schema.nodes.heading, { level: 4 }),
  'Shift-Ctrl-5': setBlockType(schema.nodes.heading, { level: 5 }),
  'Shift-Ctrl-6': setBlockType(schema.nodes.heading, { level: 6 })
}

// Create shortCuts
const keys = new CreateShortCuts({ schema, shortCuts })

// Add Plugins
const plugins = [
  columnResizing(),
  tableEditing(),
  TrackChangePlugin({ options: {} }),
  invisibles([hardBreak()])
]

// Add Rules
const rules = [emDash, ellipsis]

export { schema, keys, plugins, rules }
