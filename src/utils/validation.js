const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateForm(fields, values) {
  const errors = {}

  for (const field of fields) {
    const value = values[field.name]

    if (field.required) {
      if (field.type === 'checkbox') {
        if (!value) {
          errors[field.name] = 'This must be accepted to continue'
        }
      } else if (value === undefined || value === null || String(value).trim() === '') {
        errors[field.name] = `${field.label} is required`
      }
    }

    if (field.type === 'email' && value && String(value).trim()) {
      if (!EMAIL_REGEX.test(String(value).trim())) {
        errors[field.name] = 'Enter a valid email address'
      }
    }

    if (field.type === 'number' && value !== '' && value !== undefined && value !== null) {
      const num = Number(value)
      if (Number.isNaN(num)) {
        errors[field.name] = 'Enter a valid number'
      } else {
        if (field.min !== undefined && num < field.min) {
          errors[field.name] = `Minimum value is ${field.min}`
        }
        if (field.max !== undefined && num > field.max) {
          errors[field.name] = `Maximum value is ${field.max}`
        }
      }
    }
  }

  return errors
}

export function getInitialValues(fields) {
  return fields.reduce((acc, field) => {
    if (field.type === 'checkbox') {
      acc[field.name] = false
    } else {
      acc[field.name] = ''
    }
    return acc
  }, {})
}
