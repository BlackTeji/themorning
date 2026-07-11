import gsap from "gsap";

export function initGallery(): void {
  const items = document.querySelectorAll<HTMLElement>(".masonry-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img") as HTMLImageElement | null;
  const closeBtn = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImg || !closeBtn || items.length === 0) return;

  let lastFocused: HTMLElement | null = null;

  const open = (src: string, alt: string, trigger: HTMLElement) => {
    lastFocused = trigger;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.fromTo(lightboxImg, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.05 });
    closeBtn.focus();
  };

  const close = () => {
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        lightbox.classList.remove("is-open");
        document.body.style.overflow = "";
        lastFocused?.focus();
      },
    });
  };

  items.forEach((item) => {
    const img = item.querySelector("img");
    if (!img) return;
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `View larger image: ${img.alt}`);

    const trigger = () => open(img.src, img.alt, item);
    item.addEventListener("click", trigger);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
  });
}
