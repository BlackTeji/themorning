import { HERO_MEDIA } from "./config.js";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function prefersReducedData(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  if (connection.effectiveType && /2g/.test(connection.effectiveType)) return true;
  return false;
}

export function initHeroVideo(): void {
  const hero = document.getElementById("hero");
  const video = document.getElementById("hero-video") as HTMLVideoElement | null;
  if (!hero || !video) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!HERO_MEDIA.enabled || prefersReducedMotion || prefersReducedData()) {
    hero.classList.add("no-hero-video");
    return;
  }

  let settled = false;

  const fallback = () => {
    if (settled) return;
    settled = true;
    hero.classList.add("no-hero-video");
  };

  const reveal = () => {
    if (settled) return;
    settled = true;
    hero.classList.add("hero-video-ready");
    video.play().catch(fallback);
  };

  video.addEventListener("error", fallback);

  video.addEventListener("canplay", reveal, { once: true });

  window.setTimeout(() => {
    if (settled) return;
    if (video.readyState === 0 || video.networkState === 3) {
      fallback();
    }
  }, 2500);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(hero);
}
