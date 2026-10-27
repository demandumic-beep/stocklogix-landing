import type { Block } from 'payload'

export const Cta: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклик до дії' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    {
      name: 'button',
      type: 'group',
      label: 'Кнопка',
      fields: [
        { name: 'text', type: 'text', label: 'Текст', required: true },
        { name: 'link', type: 'text', label: 'Посилання', required: true },
      ],
    },
  ],
}
