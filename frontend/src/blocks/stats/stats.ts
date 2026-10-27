import "./stats.css";
import type { StatsBlock } from "../../types";
import { anchorAttr, esc } from "../../utils";

export function stats({ anchor, title, items }: StatsBlock): string {
  return `
    <section class="stats"${anchorAttr(anchor)}>
      ${title ? `<h2 class="stats__title">${esc(title)}</h2>` : ""}
      <dl class="stats__grid">
        ${items
          .map(
            ({ value, label }) => `
          <div class="stat">
            <dt class="stat__value">${esc(value)}</dt>
            <dd class="stat__label">${esc(label)}</dd>
          </div>`,
          )
          .join("")}
      </dl>
    </section>
  `;
}
