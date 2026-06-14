import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash2,
} from 'lucide-react'
import { RARITIES } from '../data/starterTemplate'

export default function FieldCard({
  field,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const update = (key, value) => onUpdate(field.id, { [key]: value })

  return (
    <article className={`field-card rarity-${field.rarity ?? 'common'}`}>
      <div className="field-card-header">
        <GripVertical size={16} className="grip-icon" aria-hidden="true" />
        <span className="field-type-badge">{field.type}</span>
        <div className="field-card-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onMoveUp(field.id)}
            disabled={index === 0}
            aria-label="Move field up"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => onMoveDown(field.id)}
            disabled={index === total - 1}
            aria-label="Move field down"
          >
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            className="icon-btn danger"
            onClick={() => onDelete(field.id)}
            aria-label="Delete field"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="field-card-body">
        <label className="input-group">
          <span>Label</span>
          <input
            type="text"
            value={field.label}
            onChange={(e) => update('label', e.target.value)}
          />
        </label>

        <label className="input-group">
          <span>Name</span>
          <input
            type="text"
            value={field.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </label>

        <label className="input-group">
          <span>Rarity Tier</span>
          <select
            value={field.rarity ?? 'common'}
            onChange={(e) => update('rarity', e.target.value)}
          >
            {RARITIES.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="toggle-row">
          <input
            type="checkbox"
            checked={!!field.required}
            onChange={(e) => update('required', e.target.checked)}
          />
          <span>Required field</span>
        </label>

        {(field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'number' ||
          field.type === 'textarea') && (
          <label className="input-group">
            <span>Placeholder</span>
            <input
              type="text"
              value={field.placeholder ?? ''}
              onChange={(e) => update('placeholder', e.target.value)}
            />
          </label>
        )}

        {field.type === 'number' && (
          <div className="input-row">
            <label className="input-group">
              <span>Min</span>
              <input
                type="number"
                value={field.min ?? ''}
                onChange={(e) =>
                  update('min', e.target.value === '' ? undefined : Number(e.target.value))
                }
              />
            </label>
            <label className="input-group">
              <span>Max</span>
              <input
                type="number"
                value={field.max ?? ''}
                onChange={(e) =>
                  update('max', e.target.value === '' ? undefined : Number(e.target.value))
                }
              />
            </label>
          </div>
        )}

        {field.type === 'dropdown' && (
          <label className="input-group">
            <span>Options (one per line)</span>
            <textarea
              rows={4}
              value={(field.options ?? []).join('\n')}
              onChange={(e) =>
                update(
                  'options',
                  e.target.value
                    .split('\n')
                    .map((o) => o.trim())
                    .filter(Boolean),
                )
              }
            />
          </label>
        )}
      </div>
    </article>
  )
}
