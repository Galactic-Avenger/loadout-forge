import {
  Calendar,
  CheckSquare,
  Hash,
  List,
  Mail,
  Plus,
  TextCursorInput,
  Type,
} from 'lucide-react'
import { FIELD_TYPES } from '../data/starterTemplate'
import FieldCard from './FieldCard'

const TYPE_ICONS = {
  text: Type,
  email: Mail,
  dropdown: List,
  checkbox: CheckSquare,
  date: Calendar,
  number: Hash,
  textarea: TextCursorInput,
}

export default function BuilderPanel({
  schema,
  onSchemaChange,
  onAddField,
  onUpdateField,
  onDeleteField,
  onMoveField,
  onLoadTemplate,
}) {
  const updateTitle = (title) => onSchemaChange({ ...schema, title })
  const updateDescription = (description) =>
    onSchemaChange({ ...schema, description })

  return (
    <section className="panel builder-panel">
      <div className="panel-header">
        <h2>Loadout Builder</h2>
        <p>Forge your tournament registration form</p>
      </div>

      <div className="panel-toolbar">
        <button type="button" className="btn secondary" onClick={onLoadTemplate}>
          Load Squad Template
        </button>
      </div>

      <label className="input-group form-meta">
        <span>Form Title</span>
        <input
          type="text"
          value={schema.title}
          onChange={(e) => updateTitle(e.target.value)}
        />
      </label>

      <label className="input-group form-meta">
        <span>Description</span>
        <input
          type="text"
          value={schema.description ?? ''}
          onChange={(e) => updateDescription(e.target.value)}
        />
      </label>

      <div className="add-fields">
        <span className="add-fields-label">Add Field</span>
        <div className="add-fields-grid">
          {FIELD_TYPES.map(({ type, label, rarity }) => {
            const Icon = TYPE_ICONS[type]
            return (
              <button
                key={type}
                type="button"
                className={`add-field-btn rarity-${rarity}`}
                onClick={() => onAddField(type)}
              >
                <Icon size={16} />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="field-list">
        {schema.fields.length === 0 ? (
          <div className="empty-state">
            <Plus size={24} />
            <p>No fields yet — add one above or load the squad template.</p>
          </div>
        ) : (
          schema.fields.map((field, index) => (
            <FieldCard
              key={field.id}
              field={field}
              index={index}
              total={schema.fields.length}
              onUpdate={onUpdateField}
              onDelete={onDeleteField}
              onMoveUp={(id) => onMoveField(id, 'up')}
              onMoveDown={(id) => onMoveField(id, 'down')}
            />
          ))
        )}
      </div>
    </section>
  )
}
