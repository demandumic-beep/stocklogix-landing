import "./roles.css";
import type { RolesBlock } from "../../types";
import { anchorAttr, esc } from "../../utils";

export function roles({ anchor, title, items }: RolesBlock): string {
  return `
    <section class="roles"${anchorAttr(anchor)}>
      <h2 class="section-title">${esc(title)}</h2>
      <div class="roles__grid">
        ${items
          .map(
            ({ title, subtitle, points }) => `
          <article class="role">
            <h3 class="role__title">${esc(title)}</h3>
            ${subtitle ? `<p class="role__subtitle">${esc(subtitle)}</p>` : ""}
            <ul class="role__list">
              ${points.map(({ text }) => `<li>${esc(text)}</li>`).join("")}
            </ul>
          </article>`,
          )
          .join("")}
      </div>
    </section>
  `;
}
