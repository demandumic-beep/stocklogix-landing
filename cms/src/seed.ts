// Заповнює CMS стартовим контентом із ../backend/data/*.json.
// Запуск: npm run seed (можна повторно: наявні записи оновлюються).
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'

import config from './payload.config'

const dataDir = path.resolve(process.cwd(), '../backend/data')
const read = <T>(file: string): T => JSON.parse(readFileSync(path.join(dataDir, file), 'utf-8')) as T

type Json = Record<string, unknown>

/** type → blockType (формат, який очікує Payload). */
const toPayloadBlock = ({ type, ...rest }: Json) => ({ blockType: type as string, ...rest })

async function seed() {
  const payload = await getPayload({ config })

  const common = read<Json>('common.json')
  await payload.updateGlobal({ slug: 'common', data: common as never })
  console.log('Налаштування сайту оновлено')

  for (const page of read<{ path: string; title: string; blocks: Json[] }[]>('pages.json')) {
    const data = { path: page.path, title: page.title, blocks: page.blocks.map(toPayloadBlock) }

    const existing = await payload.find({
      collection: 'pages',
      where: { path: { equals: page.path } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data: data as never })
      console.log(`Сторінку ${page.path} оновлено`)
    } else {
      await payload.create({ collection: 'pages', data: data as never })
      console.log(`Сторінку ${page.path} створено`)
    }
  }

  process.exit(0)
}

void seed()
