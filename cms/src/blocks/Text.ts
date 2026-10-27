import type { Block } from 'payload'

export const Text: Block = {
  slug: 'text',
  labels: { singular: 'Текст', plural: 'Текст' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'text', type: 'textarea', label: 'Текст', required: true },
  ],
}
