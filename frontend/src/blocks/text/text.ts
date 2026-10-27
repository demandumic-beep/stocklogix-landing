import "./text.css";
import type { TextBlock } from "../../types";
import { anchorAttr, esc } from "../../utils";

export function text({ anchor, title, text }: TextBlock): string {
  return `
    <section class="text"${anchorAttr(anchor)}>
      <h2 class="text__title">${esc(title)}</h2>
      <p class="text__body">${esc(text)}</p>
    </section>
  `;
}
