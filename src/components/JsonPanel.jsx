import { AlertCircle, Braces } from 'lucide-react'

export default function JsonPanel({ jsonText, jsonError, onJsonChange }) {
  return (
    <section className="panel json-panel">
      <div className="panel-header">
        <h2>
          <Braces size={20} className="inline-icon" />
          JSON Schema
        </h2>
        <p>Live-editable form definition</p>
      </div>

      {jsonError && (
        <div className="json-error" role="alert">
          <AlertCircle size={16} />
          <span>{jsonError}</span>
        </div>
      )}

      <textarea
        className={`json-editor ${jsonError ? 'has-error' : ''}`}
        value={jsonText}
        onChange={(e) => onJsonChange(e.target.value)}
        spellCheck={false}
        aria-label="Form JSON schema"
      />
    </section>
  )
}
