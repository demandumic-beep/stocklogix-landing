import "./cta.css";
import type { CtaBlock } from "../../types";
import { anchorAttr, esc, url } from "../../utils";

export function cta({ anchor, title, button }: CtaBlock): string {
  return `
    <section class="cta"${anchorAttr(anchor)}>
      <div class="cta__card">
        <h2 class="cta__title">${esc(title)}</h2>
        <a class="btn btn--primary" href="${url(button.link)}">${esc(button.text)}</a>
      </div>
    </section>
  `;
}
