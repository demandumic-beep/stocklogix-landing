# StockLogix: лендінг (Vite + Payload CMS, TypeScript)

Лендінг для Django-проєкту StockLogix (облік складів + інтернет-магазин). Архітектура взята з прикладу `landos-it21-bosco`:
frontend нічого не знає про контент, він просто малює блоки, які приходять з API.

```
Landing_CMS_TypeScript/
├── frontend/   Vite + TypeScript: малює сторінку з JSON (порт 5173)
├── cms/        Payload 3 + Next.js + SQLite: адмінка і API (порт 3000)
└── backend/    тестовий Express із JSON-файлів, без бази (порт 4000)
```

## Сторінки і вигляд

Вигляд (темна фіолетова тема, скляна картка поверх фону в hero, картки з ціною-пігулкою) взято з прикладу learniva. Як і в ньому, сайт складається з контентних сторінок: `/` (також `/home`) і `/about`, а перехід між ними йде через меню й кнопки. Нова сторінка = новий запис у CMS (Сторінки) з потрібним `path`, пункт меню додається в «Налаштування сайту». Для Vercel є `frontend/vercel.json` (прямі посилання на `/about` працюють).

## Як це працює

```
Редактор у /admin  →  Payload (колекція Pages + блоки)  →  GET /api/page?path=/
                                                          GET /api/common
                                                                ↓
                                      frontend: render.ts бере block.type і викликає потрібну функцію
```

- **Сторінка** = `path` + `title` + список **блоків** (`hero`, `text`, `cta`, `features`, `stats`, `products`, `roles`, `contacts`).
- **Common** (глобальні налаштування) = назва сайту, меню, текст футера.
- Формат відповіді однаковий у `cms/src/endpoints.ts` і `backend/server.ts`, тому frontend можна переключати між ними змінною `VITE_API_URL`.

## Запуск (усе разом, одна команда)

Потрібен Node.js 20+. Усі команди виконуються в корені проєкту (де цей файл).

```bash
npm install          # ставить лише "concurrently" (запуск кількох програм разом)
npm run setup        # створює .env файли і ставить залежності в cms, frontend, backend
```

**Варіант А: сайт + тестовий backend (без CMS, найшвидше).**

```bash
npm run dev:mock
```

Відкрийте http://localhost:5173. Frontend бере дані з `backend/data/*.json`.

**Варіант Б: сайт + Payload CMS (справжня робота).**

```bash
npm run dev
```

- Сайт: http://localhost:5173
- Адмінка CMS: http://localhost:3000/admin (перший вхід = створення користувача)
- Потім у другому терміналі: `npm run seed` (заливає стартовий контент у CMS), і оновіть сайт.

Зв'язок між частинами вже налаштований: frontend у режимі `dev` звертається до `http://localhost:3000`, у режимі `dev:mock` до `http://localhost:4000` (файли `frontend/.env.development` і `.env.mock`). Окремо нічого копіювати не треба. Зупинити все: `Ctrl+C`.

Якщо адмінка видає помилку про importMap: `npm --prefix cms run generate:importmap`, і запустіть `npm run dev` знову.

Картинки: завантажте в «Медіафайли» й оберіть у блоці Hero або в товарі. Без картинки Hero показує `frontend/public/hero.svg`, а товар показує іконку.

## Як додати новий блок (наприклад, `faq`)

1. `frontend/src/types.ts`: тип `FaqBlock` і додати його в `Block`.
2. `frontend/src/blocks/faq/faq.ts` + `faq.css` (функція, що повертає HTML).
3. `frontend/src/render.ts`: додати `faq` у `renderers` (TypeScript сам підкаже, якщо забудеш).
4. `cms/src/blocks/Faq.ts` і додати в `blocks: [...]` у `cms/src/collections/Pages.ts`.
5. Додати блок у `backend/data/pages.json` для тестів.

## Зв'язок із Django

Кнопки «Відкрити магазин» ведуть на `http://localhost:8000/`. Якщо каталог у тебе на іншій адресі (наприклад `/shop/`), поміняй посилання в адмінці або в `pages.json`.

## Що далі (наступні етапи)

- Секція «Відгуки» і FAQ (нові блоки).
- Підтягувати товари з Django (невеликий JSON-ендпоінт у `inventory`) замість ручного списку.
- Форма зворотного зв'язку, що створює звернення в `support_tickets`.
- SEO: `description` і OG-картинка в колекції Pages.
- Деплой: frontend на статичний хостинг (`npm run build` → `dist/`), CMS на Postgres (`@payloadcms/db-postgres`) і зовнішнє сховище для медіа.

## Безпека

- `.env` не комітимо (він у `.gitignore`).
- Весь текст із CMS екранується у `frontend/src/utils.ts` (`esc`, `url`), тому розмітку в полях редактор вставити не зможе.
