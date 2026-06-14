export default function PreviewField({ field, value, error, onChange }) {
  const inputId = `preview-${field.name}`
  const errorId = `${inputId}-error`

  const commonProps = {
    id: inputId,
    name: field.name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  let control

  switch (field.type) {
    case 'textarea':
      control = (
        <textarea
          {...commonProps}
          rows={4}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )
      break
    case 'dropdown':
      control = (
        <select
          {...commonProps}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="">Select…</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )
      break
    case 'checkbox':
      control = (
        <label className="preview-checkbox">
          <input
            {...commonProps}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(field.name, e.target.checked)}
          />
          <span>{field.label}</span>
        </label>
      )
      break
    case 'number':
      control = (
        <input
          {...commonProps}
          type="number"
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )
      break
    case 'date':
      control = (
        <input
          {...commonProps}
          type="date"
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )
      break
    case 'email':
      control = (
        <input
          {...commonProps}
          type="email"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )
      break
    default:
      control = (
        <input
          {...commonProps}
          type="text"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )
  }

  return (
    <div
      className={`preview-field rarity-${field.rarity ?? 'common'} ${error ? 'has-error' : ''}`}
    >
      {field.type !== 'checkbox' && (
        <label htmlFor={inputId}>
          {field.label}
          {field.required && <span className="required-mark">*</span>}
        </label>
      )}
      {control}
      {error && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
