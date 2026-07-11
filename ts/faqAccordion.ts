import gsap from "gsap";

export function initFaqAccordion(): void {
  const items = document.querySelectorAll<HTMLElement>(".accordion-item");

  items.forEach((item, index) => {
    const trigger = item.querySelector<HTMLButtonElement>(".accordion-trigger");
    const panel = item.querySelector<HTMLElement>(".accordion-panel");
    const inner = item.querySelector<HTMLElement>(".accordion-panel-inner");
    if (!trigger || !panel || !inner) return;

    const panelId = `faq-panel-${index}`;
    const triggerId = `faq-trigger-${index}`;
    panel.id = panelId;
    trigger.id = triggerId;
    trigger.setAttribute("aria-controls", panelId);
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", triggerId);
    trigger.setAttribute("aria-expanded", "false");
    gsap.set(panel, { height: 0 });

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        if (other !== item && other.classList.contains("is-open")) {
          const otherPanel = other.querySelector<HTMLElement>(".accordion-panel");
          const otherTrigger = other.querySelector<HTMLButtonElement>(".accordion-trigger");
          other.classList.remove("is-open");
          otherTrigger?.setAttribute("aria-expanded", "false");
          if (otherPanel) gsap.to(otherPanel, { height: 0, duration: 0.6, ease: "power2.inOut" });
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        gsap.to(panel, { height: 0, duration: 0.6, ease: "power2.inOut" });
      } else {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        gsap.to(panel, { height: inner.offsetHeight, duration: 0.6, ease: "power2.inOut" });
      }
    });
  });
}
