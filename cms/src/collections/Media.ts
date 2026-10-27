import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Зображення', plural: 'Медіафайли' },
  access: { read: () => true },
  fields: [{ name: 'alt', type: 'text', label: 'Опис (alt)', required: true }],
  upload: true,
}
