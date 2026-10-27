import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  labels: { singular: 'Цифри', plural: 'Цифри' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок' },
    {
      name: 'items',
      type: 'array',
      label: 'Показники',
      fields: [
        { name: 'value', type: 'text', label: 'Значення', required: true },
        { name: 'label', type: 'text', label: 'Підпис', required: true },
      ],
    },
  ],
}
