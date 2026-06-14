import { useState } from 'react'
import { CheckCircle2, Eye, RotateCcw, Send } from 'lucide-react'
import { getInitialValues, validateForm } from '../utils/validation'
import PreviewField from './PreviewField'

export default function PreviewPanel({ schema, onSubmit }) {
  const [values, setValues] = useState(() => getInitialValues(schema.fields))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm(schema.fields, values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values)
      setSubmitted(true)
      setValues(getInitialValues(schema.fields))
    }
  }

  const handleReset = () => {
    setValues(getInitialValues(schema.fields))
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section className="panel preview-panel">
      <div className="panel-header">
        <h2>
          <Eye size={20} className="inline-icon" />
          Live Preview
        </h2>
        <p>Test your registration form</p>
      </div>

      <form className="preview-form" onSubmit={handleSubmit} noValidate>
        <div className="preview-form-header">
          <h3>{schema.title}</h3>
          {schema.description && <p>{schema.description}</p>}
        </div>

        {schema.fields.map((field) => (
          <PreviewField
            key={field.id ?? field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ))}

        {submitted && (
          <div className="submit-success" role="status">
            <CheckCircle2 size={18} />
            Registration submitted — check the Leaderboard!
          </div>
        )}

        <div className="preview-actions">
          <button type="submit" className="btn primary">
            <Send size={16} />
            Submit Registration
          </button>
          <button type="button" className="btn secondary" onClick={handleReset}>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}
