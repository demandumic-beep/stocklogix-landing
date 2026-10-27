import "./contacts.css";
import type { ContactsBlock } from "../../types";
import { anchorAttr, esc, url } from "../../utils";
import { icon } from "../../icons";

export function contacts({ anchor, title, text, phone, email, address, button }: ContactsBlock): string {
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";

  return `
    <section class="contacts"${anchorAttr(anchor)}>
      <h2 class="section-title">${esc(title)}</h2>
      ${text ? `<p class="contacts__text">${esc(text)}</p>` : ""}
      <ul class="contacts__list">
        ${phone ? `<li>${icon("call", 20)}<a href="${url(phoneHref)}">${esc(phone)}</a></li>` : ""}
        ${email ? `<li>${icon("mail", 20)}<a href="${url(`mailto:${email}`)}">${esc(email)}</a></li>` : ""}
        ${address ? `<li>${icon("pin", 20)}<span>${esc(address)}</span></li>` : ""}
      </ul>
      ${button ? `<a class="btn btn--primary" href="${url(button.link)}">${esc(button.text)}</a>` : ""}
    </section>
  `;
}
