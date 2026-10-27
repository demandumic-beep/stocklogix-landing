import "./products.css";
import type { ProductsBlock } from "../../types";
import { anchorAttr, esc, formatPrice, url } from "../../utils";
import { icon } from "../../icons";

export function products({ anchor, title, subtitle, items, button }: ProductsBlock): string {
  return `
    <section class="products"${anchorAttr(anchor)}>
      <h2 class="section-title">${esc(title)}</h2>
      ${subtitle ? `<p class="products__subtitle">${esc(subtitle)}</p>` : ""}
      <div class="products__grid">
        ${items
          .map(
            ({ icon: iconName, image, category, name, description, price }) => `
          <article class="product">
            <div class="product__media">
              ${
                image
                  ? `<img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy">`
                  : `<span class="product__icon">${icon(iconName, 56)}</span>`
              }
            </div>
            ${category ? `<span class="product__category">${esc(category)}</span>` : ""}
            <h3 class="product__name">${esc(name)}</h3>
            ${description ? `<p class="product__text">${esc(description)}</p>` : ""}
            <strong class="product__price">${formatPrice(price)}</strong>
          </article>`,
          )
          .join("")}
      </div>
      ${
        button
          ? `<div class="products__more"><a class="btn btn--primary" href="${url(button.link)}">${esc(button.text)}</a></div>`
          : ""
      }
    </section>
  `;
}
