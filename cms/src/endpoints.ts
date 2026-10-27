import type { Endpoint, PayloadRequest } from 'payload'

const CMS_URL = process.env.CMS_URL || 'http://localhost:3000'

/** Файл із колекції media (upload) → { src, alt } для frontend. */
function isMedia(value: unknown): value is { url: string; alt?: string } {
  return typeof value === 'object' && value !== null && typeof (value as any).url === 'string'
}

/**
 * Рекурсивно чистить дані блоку під формат frontend:
 *  - прибирає службові id / blockName,
 *  - blockType → type,
 *  - upload-поля → { src, alt } з повним посиланням на CMS.
 */
function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean)

  if (isMedia(value)) {
    const src = value.url.startsWith('http') ? value.url : `${CMS_URL}${value.url}`
    return { src, alt: value.alt ?? '' }
  }

  if (typeof value === 'object' && value !== null) {
    const { id: _id, blockName: _blockName, blockType, ...rest } = value as Record<string, unknown>
    const result: Record<string, unknown> = blockType ? { type: blockType } : {}

    for (const [key, val] of Object.entries(rest)) {
      if (val === null || val === undefined || val === '') continue // порожнє поле не віддаємо
      result[key] = clean(val)
    }

    return result
  }

  return value
}

export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const common = await req.payload.findGlobal({ slug: 'common', depth: 1 })

    return Response.json({
      siteName: common.siteName,
      menu: (common.menu ?? []).map(({ label, link }: { label: string; link: string }) => ({
        label,
        link,
      })),
      footer: { text: common.footer?.text ?? '' },
    })
  },
}

export const pageEndpoint: Endpoint = {
  path: '/page',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const path = String(req.query?.path ?? '/')

    const result = await req.payload.find({
      collection: 'pages',
      where: { path: { equals: path } },
      depth: 2,
      limit: 1,
    })

    const page = result.docs[0]

    if (!page) {
      return Response.json({ error: 'Сторінку не знайдено' }, { status: 404 })
    }

    return Response.json({
      path: page.path,
      title: page.title,
      blocks: (page.blocks ?? []).map(clean),
    })
  },
}
