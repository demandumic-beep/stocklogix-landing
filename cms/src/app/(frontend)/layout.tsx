import React from 'react'

export const metadata = {
  title: 'StockLogix CMS',
  description: 'Адмін-панель контенту лендінгу StockLogix',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '48px' }}>{children}</body>
    </html>
  )
}
