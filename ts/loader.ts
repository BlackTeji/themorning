import gsap from "gsap";

const MIN_DISPLAY_MS = 1200;

export function initLoader(onComplete?: () => void): void {
  const loader = document.getElementById("loader");
  if (!loader) {
    onComplete?.();
    return;
  }

  const start = performance.now();

  const hide = () => {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    window.setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          loader.style.display = "none";
          loader.setAttribute("aria-hidden", "true");
          document.body.classList.remove("is-loading");
          onComplete?.();
        },
      });
    }, remaining);
  };

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
  }
}
