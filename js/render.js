import { DETAILS, FAQS, GALLERY } from "./config.js";
import { DETAIL_ICONS, MAP_PIN_ICON } from "./icons.js";
function el(tag, className) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    return node;
}
export function renderDetails() {
    const container = document.getElementById("details-grid");
    if (!container)
        return;
    DETAILS.forEach((card) => {
        const cardEl = el("article", "detail-card reveal");
        const icon = el("div", "detail-icon");
        icon.innerHTML = DETAIL_ICONS[card.icon] ?? "";
        icon.setAttribute("aria-hidden", "true");
        const label = el("p", "detail-label");
        label.textContent = card.label;
        const title = el("h3", "detail-title");
        title.textContent = card.title;
        const text = el("p", "detail-text");
        text.textContent = card.text;
        cardEl.append(icon, label, title, text);
        if (card.mapUrl) {
            const link = el("a", "map-btn");
            link.href = card.mapUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.innerHTML = `${MAP_PIN_ICON}<span>Open in Maps</span>`;
            cardEl.appendChild(link);
        }
        container.appendChild(cardEl);
    });
}
export function renderGallery() {
    const container = document.getElementById("gallery-grid");
    if (!container)
        return;
    GALLERY.forEach((image) => {
        const item = el("div", "masonry-item reveal");
        const img = el("img");
        img.src = image.src;
        img.alt = image.alt;
        img.loading = "lazy";
        img.decoding = "async";
        item.appendChild(img);
        container.appendChild(item);
    });
}
export function renderFaq() {
    const container = document.getElementById("faq-accordion");
    if (!container)
        return;
    FAQS.forEach((faq) => {
        const item = el("div", "accordion-item");
        const trigger = el("button", "accordion-trigger");
        trigger.type = "button";
        trigger.innerHTML = `<span>${faq.question}</span><span class="plus" aria-hidden="true"></span>`;
        const panel = el("div", "accordion-panel");
        const inner = el("div", "accordion-panel-inner");
        inner.textContent = faq.answer;
        panel.appendChild(inner);
        item.append(trigger, panel);
        container.appendChild(item);
    });
}
export function renderAll() {
    renderDetails();
    renderGallery();
    renderFaq();
}
