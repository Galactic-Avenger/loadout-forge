import { useCallback, useState } from 'react'
import BuilderPanel from './components/BuilderPanel'
import Header from './components/Header'
import JsonPanel from './components/JsonPanel'
import PreviewPanel from './components/PreviewPanel'
import SubmissionsTable from './components/SubmissionsTable'
import { SQUAD_TOURNAMENT_TEMPLATE } from './data/starterTemplate'
import {
  createDefaultField,
  parseSchema,
  schemaToJson,
} from './utils/schema'
import './App.css'

export default function App() {
  const [schema, setSchema] = useState(SQUAD_TOURNAMENT_TEMPLATE)
  const [jsonText, setJsonText] = useState(() => schemaToJson(SQUAD_TOURNAMENT_TEMPLATE))
  const [jsonError, setJsonError] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [activeView, setActiveView] = useState('builder')

  const syncSchema = useCallback((nextSchema) => {
    setSchema(nextSchema)
    setJsonText(schemaToJson(nextSchema))
    setJsonError(null)
  }, [])

  const handleJsonChange = (text) => {
    setJsonText(text)
    try {
      const parsed = parseSchema(text)
      setSchema(parsed)
      setJsonError(null)
    } catch (err) {
      setJsonError(err.message)
    }
  }

  const handleAddField = (type) => {
    syncSchema({
      ...schema,
      fields: [...schema.fields, createDefaultField(type)],
    })
  }

  const handleUpdateField = (id, updates) => {
    syncSchema({
      ...schema,
      fields: schema.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })
  }

  const handleDeleteField = (id) => {
    syncSchema({
      ...schema,
      fields: schema.fields.filter((f) => f.id !== id),
    })
  }

  const handleMoveField = (id, direction) => {
    const index = schema.fields.findIndex((f) => f.id === id)
    if (index === -1) return

    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= schema.fields.length) return

    const fields = [...schema.fields]
    ;[fields[index], fields[target]] = [fields[target], fields[index]]
    syncSchema({ ...schema, fields })
  }

  const handleLoadTemplate = () => {
    syncSchema(structuredClone(SQUAD_TOURNAMENT_TEMPLATE))
  }

  const handleSubmit = (data) => {
    setSubmissions((prev) => [
      {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        data,
      },
      ...prev,
    ])
  }

  const fieldNames = schema.fields.map((f) => f.label)

  return (
    <div className="app">
      <Header activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'builder' ? (
        <main className="workspace">
          <BuilderPanel
            schema={schema}
            onSchemaChange={syncSchema}
            onAddField={handleAddField}
            onUpdateField={handleUpdateField}
            onDeleteField={handleDeleteField}
            onMoveField={handleMoveField}
            onLoadTemplate={handleLoadTemplate}
          />
          <JsonPanel
            jsonText={jsonText}
            jsonError={jsonError}
            onJsonChange={handleJsonChange}
          />
          <PreviewPanel
            key={schema.fields.map((f) => `${f.id}:${f.name}:${f.type}`).join('|')}
            schema={schema}
            onSubmit={handleSubmit}
          />
        </main>
      ) : (
        <main className="submissions-main">
          <SubmissionsTable
            submissions={submissions}
            fieldNames={fieldNames}
            onClear={() => setSubmissions([])}
          />
        </main>
      )}
    </div>
  )
}
