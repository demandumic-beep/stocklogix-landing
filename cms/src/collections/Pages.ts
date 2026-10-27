import type { CollectionConfig } from 'payload'

import { Hero } from '../blocks/Hero'
import { Text } from '../blocks/Text'
import { Cta } from '../blocks/Cta'
import { Features } from '../blocks/Features'
import { Stats } from '../blocks/Stats'
import { Products } from '../blocks/Products'
import { Roles } from '../blocks/Roles'
import { Contacts } from '../blocks/Contacts'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    {
      name: 'path',
      type: 'text',
      label: 'Адреса сторінки',
      required: true,
      unique: true,
      defaultValue: '/',
    },
    { name: 'title', type: 'text', label: 'Назва сторінки', required: true },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Блоки',
      blocks: [Hero, Text, Cta, Features, Stats, Products, Roles, Contacts],
    },
  ],
}
