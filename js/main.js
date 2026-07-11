import { renderAll } from "./render.js";
import { initLoader } from "./loader.js";
import { initSmoothScroll } from "./smoothScroll.js";
import { initParticles } from "./particles.js";
import { initAnimations } from "./animations.js";
import { initCountdown } from "./countdown.js";
import { initRsvpForm } from "./rsvpForm.js";
import { initGallery } from "./gallery.js";
import { initFaqAccordion } from "./faqAccordion.js";
import { initAudioToggle } from "./audioToggle.js";
import { initCursorGlow } from "./cursorGlow.js";
import { initProgressBar } from "./progress.js";
import { initHeroVideo } from "./heroVideo.js";
import { initGiftModal } from "./giftModal.js";
function bootstrap() {
    renderAll();
    initSmoothScroll();
    initParticles();
    initAnimations();
    initCountdown();
    initRsvpForm();
    initGallery();
    initFaqAccordion();
    initAudioToggle();
    initCursorGlow();
    initProgressBar();
    initHeroVideo();
    initGiftModal();
    initLoader();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
}
else {
    bootstrap();
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
        });
    });
}
