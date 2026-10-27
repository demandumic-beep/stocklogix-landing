import type { Settings } from "../types";
import { esc } from "../utils";

export function footer({ siteName, footer: { text } }: Settings): string {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">© ${year} ${esc(siteName)}. ${esc(text)}</footer>
  `;
}
