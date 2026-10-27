import type { Block } from 'payload'

export const Roles: Block = {
  slug: 'roles',
  labels: { singular: 'Ролі', plural: 'Ролі' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Ролі',
      fields: [
        { name: 'title', type: 'text', label: 'Назва ролі', required: true },
        { name: 'subtitle', type: 'text', label: 'Підпис' },
        {
          name: 'points',
          type: 'array',
          label: 'Можливості',
          fields: [{ name: 'text', type: 'text', label: 'Текст', required: true }],
        },
      ],
    },
  ],
}
