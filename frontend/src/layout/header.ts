import type { Settings } from "../types";
import { esc, url } from "../utils";

/** Шлях без #якоря і кінцевого слеша: "/about/#x" → "/about". */
function pathOf(link: string): string {
  return link.split("#")[0].replace(/\/+$/, "") || "/";
}

export function header({ siteName, menu }: Settings, currentPath = "/"): string {
  return `
    <header class="header">
      <a class="header__logo" href="/">${esc(siteName)}</a>
      <nav class="header__nav">
        ${menu
          .map(({ label, link }) => {
            const active = !link.includes("#") && pathOf(link) === currentPath;
            return `<a class="header__link"${active ? ' aria-current="page"' : ""} href="${url(link)}">${esc(label)}</a>`;
          })
          .join("")}
      </nav>
    </header>
  `;
}
