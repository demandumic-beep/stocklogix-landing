const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Екранує текст, що прийшов із CMS, перед вставкою в HTML. */
export function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

/** Дозволяє лише безпечні посилання (#якір, /шлях, http(s), mailto, tel). */
export function url(value: unknown): string {
  const v = String(value ?? "").trim();
  return /^(#|\/|https?:\/\/|mailto:|tel:)/i.test(v) ? esc(v) : "#";
}

export function anchorAttr(anchor?: string): string {
  return anchor ? ` id="${esc(anchor)}"` : "";
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("uk-UA").format(value)} ₴`;
}

/** Безпечне значення для css url("...") усередині HTML-атрибута. */
export function cssUrl(value: string): string {
  const safe = encodeURI(value).replace(/['"()]/g, (c) => `%${c.charCodeAt(0).toString(16)}`);
  return esc(`url("${safe}")`);
}
