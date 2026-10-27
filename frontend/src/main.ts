import "./styles/base.css";
import { getSettings, getPage } from "./api";
import { renderBlocks } from "./render";
import { header } from "./layout/header";
import { footer } from "./layout/footer";
import { esc } from "./utils";

/** "/home" і "/about/" → "/" і "/about" (ключ сторінки в CMS). */
function currentPath(): string {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  return path === "/home" ? "/" : path;
}

const app = document.querySelector<HTMLDivElement>("#app")!;

async function start(): Promise<void> {
  try {
    const [settings, page] = await Promise.all([
      getSettings(),
      getPage(currentPath()),
    ]);

    document.title = `${page.title} — ${settings.siteName}`;

    app.innerHTML = `
      ${header(settings, currentPath())}
      <main>${renderBlocks(page.blocks)}</main>
      ${footer(settings)}
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    app.innerHTML = `<p class="error">Не вдалося завантажити сторінку: ${esc(message)}</p>`;
  }
}

void start();
