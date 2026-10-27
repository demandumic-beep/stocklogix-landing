// Лендінг віддає окремий frontend (Vite). Тут лише підказка.
export default function HomePage() {
  return (
    <main>
      <h1>StockLogix: CMS лендінгу</h1>
      <p>
        Керування контентом: <a href="/admin">/admin</a>
      </p>
      <p>
        API для frontend: <a href="/api/common">/api/common</a> ·{' '}
        <a href="/api/page?path=/">/api/page?path=/</a>
      </p>
    </main>
  )
}
