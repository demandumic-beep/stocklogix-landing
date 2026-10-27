import type { Block } from 'payload'

export const Contacts: Block = {
  slug: 'contacts',
  labels: { singular: 'Контакти', plural: 'Контакти' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'text', type: 'textarea', label: 'Текст' },
    { name: 'phone', type: 'text', label: 'Телефон' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'address', type: 'text', label: 'Адреса' },
    {
      name: 'button',
      type: 'group',
      label: 'Кнопка',
      fields: [
        { name: 'text', type: 'text', label: 'Текст' },
        { name: 'link', type: 'text', label: 'Посилання' },
      ],
    },
  ],
}
