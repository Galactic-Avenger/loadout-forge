export const SQUAD_TOURNAMENT_TEMPLATE = {
  title: 'Squad Tournament Signup',
  description: 'Register your squad for the upcoming tournament.',
  fields: [
    {
      id: 'field-1',
      type: 'text',
      label: 'Epic Username',
      name: 'epicUsername',
      required: true,
      placeholder: 'Enter your display name',
      rarity: 'epic',
    },
    {
      id: 'field-2',
      type: 'dropdown',
      label: 'Platform',
      name: 'platform',
      required: true,
      options: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'],
      rarity: 'rare',
    },
    {
      id: 'field-3',
      type: 'dropdown',
      label: 'Region',
      name: 'region',
      required: true,
      options: [
        'NA-East',
        'NA-West',
        'Europe',
        'Asia',
        'Oceania',
        'Brazil',
        'Middle East',
      ],
      rarity: 'rare',
    },
    {
      id: 'field-4',
      type: 'number',
      label: 'Squad Size',
      name: 'squadSize',
      required: true,
      min: 1,
      max: 4,
      placeholder: '1–4 players',
      rarity: 'legendary',
    },
    {
      id: 'field-5',
      type: 'checkbox',
      label: 'I agree to the tournament rules and fair-play policy',
      name: 'rulesAgreement',
      required: true,
      rarity: 'common',
    },
  ],
}

export const FIELD_TYPES = [
  { type: 'text', label: 'Text', rarity: 'common' },
  { type: 'email', label: 'Email', rarity: 'rare' },
  { type: 'dropdown', label: 'Dropdown', rarity: 'rare' },
  { type: 'checkbox', label: 'Checkbox', rarity: 'common' },
  { type: 'date', label: 'Date', rarity: 'epic' },
  { type: 'number', label: 'Number', rarity: 'legendary' },
  { type: 'textarea', label: 'Textarea', rarity: 'epic' },
]

export const RARITIES = ['common', 'rare', 'epic', 'legendary']

export const SUBMISSION_RARITIES = ['common', 'rare', 'epic', 'legendary']
