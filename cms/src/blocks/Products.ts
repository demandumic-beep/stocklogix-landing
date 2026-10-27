import type { Block } from 'payload'

import { iconOptions } from '../icons'

export const Products: Block = {
  slug: 'products',
  labels: { singular: 'Товари', plural: 'Товари' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок' },
    {
      name: 'items',
      type: 'array',
      label: 'Товари',
      fields: [
        { name: 'name', type: 'text', label: 'Назва', required: true },
        { name: 'category', type: 'text', label: 'Категорія' },
        { name: 'description', type: 'text', label: 'Короткий опис' },
        { name: 'price', type: 'number', label: 'Ціна, ₴', required: true, min: 0 },
        { name: 'icon', type: 'select', label: 'Іконка (якщо немає фото)', defaultValue: 'box', options: iconOptions },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Фото' },
      ],
    },
    {
      name: 'button',
      type: 'group',
      label: 'Кнопка під списком',
      fields: [
        { name: 'text', type: 'text', label: 'Текст' },
        { name: 'link', type: 'text', label: 'Посилання' },
      ],
    },
  ],
}
