import "./features.css";
import type { FeaturesBlock } from "../../types";
import { anchorAttr, esc } from "../../utils";
import { icon } from "../../icons";

export function features({ anchor, title, items }: FeaturesBlock): string {
  return `
    <section class="features"${anchorAttr(anchor)}>
      <h2 class="section-title">${esc(title)}</h2>
      <div class="features__grid">
        ${items
          .map(
            ({ icon: iconName, title, text }) => `
          <article class="feature">
            <span class="feature__icon">${icon(iconName, 26)}</span>
            <h3 class="feature__title">${esc(title)}</h3>
            ${text ? `<p class="feature__text">${esc(text)}</p>` : ""}
          </article>`,
          )
          .join("")}
      </div>
    </section>
  `;
}
