const VALID_TYPES = new Set([
  'text',
  'email',
  'dropdown',
  'checkbox',
  'date',
  'number',
  'textarea',
])

const VALID_RARITIES = new Set(['common', 'rare', 'epic', 'legendary'])

export function createFieldId() {
  return `field-${crypto.randomUUID().slice(0, 8)}`
}

export function createDefaultField(type) {
  const rarityMap = {
    text: 'common',
    email: 'rare',
    dropdown: 'rare',
    checkbox: 'common',
    date: 'epic',
    number: 'legendary',
    textarea: 'epic',
  }

  const base = {
    id: createFieldId(),
    type,
    label: 'New Field',
    name: `field_${Date.now().toString(36)}`,
    required: false,
    rarity: rarityMap[type] ?? 'common',
  }

  if (type === 'dropdown') {
    base.options = ['Option 1', 'Option 2']
  }

  if (type === 'number') {
    base.min = 0
    base.max = 100
    base.placeholder = '0'
  }

  if (type === 'text' || type === 'email' || type === 'textarea') {
    base.placeholder = ''
  }

  return base
}

export function parseSchema(jsonText) {
  const parsed = JSON.parse(jsonText)

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Schema must be a JSON object')
  }

  if (typeof parsed.title !== 'string' || !parsed.title.trim()) {
    throw new Error('Schema must include a non-empty "title" string')
  }

  if (!Array.isArray(parsed.fields)) {
    throw new Error('Schema must include a "fields" array')
  }

  parsed.fields.forEach((field, index) => {
    if (!field || typeof field !== 'object') {
      throw new Error(`Field at index ${index} must be an object`)
    }
    if (!VALID_TYPES.has(field.type)) {
      throw new Error(`Field "${field.name ?? index}" has invalid type "${field.type}"`)
    }
    if (typeof field.label !== 'string' || !field.label.trim()) {
      throw new Error(`Field at index ${index} must have a "label" string`)
    }
    if (typeof field.name !== 'string' || !field.name.trim()) {
      throw new Error(`Field at index ${index} must have a "name" string`)
    }
    if (field.rarity && !VALID_RARITIES.has(field.rarity)) {
      throw new Error(`Field "${field.name}" has invalid rarity "${field.rarity}"`)
    }
    if (field.type === 'dropdown') {
      if (!Array.isArray(field.options) || field.options.length === 0) {
        throw new Error(`Dropdown "${field.name}" must have a non-empty "options" array`)
      }
    }
  })

  return parsed
}

export function schemaToJson(schema) {
  return JSON.stringify(schema, null, 2)
}
