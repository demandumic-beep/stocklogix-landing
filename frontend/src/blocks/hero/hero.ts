import "./hero.css";
import type { HeroBlock } from "../../types";
import { anchorAttr, cssUrl, esc, url } from "../../utils";

const FALLBACK_IMAGE = { src: "/hero.svg", alt: "" };

export function hero({
  anchor,
  size = "full",
  badge,
  title,
  subtitle,
  image,
  buttons = [],
}: HeroBlock): string {
  const bg = image ?? FALLBACK_IMAGE;

  return `
    <section class="hero hero--${size === "compact" ? "compact" : "full"}"${anchorAttr(anchor)}
      style="--hero-bg: ${cssUrl(bg.src)}" role="img" aria-label="${esc(bg.alt)}">
      <div class="hero__card">
        ${badge ? `<span class="hero__badge">${esc(badge)}</span>` : ""}
        <h1 class="hero__title">${esc(title)}</h1>
        ${subtitle ? `<p class="hero__subtitle">${esc(subtitle)}</p>` : ""}
        ${
          buttons.length
            ? `<div class="hero__actions">${buttons
                .map(
                  ({ text, link, variant }) =>
                    `<a class="btn btn--${variant === "secondary" ? "secondary" : "primary"}" href="${url(link)}">${esc(text)}</a>`,
                )
                .join("")}</div>`
            : ""
        }
      </div>
    </section>
  `;
}
