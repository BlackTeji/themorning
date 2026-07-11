import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function playHeroSequence() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (prefersReducedMotion) {
        gsap.set(["#hero-monogram", "#hero-names", "#hero-invite", "#hero-date", "#hero-countdown", "#hero-actions", "#scroll-cue"], { opacity: 1, y: 0 });
        return;
    }
    tl.set("#hero-monogram", { opacity: 0, y: 26, letterSpacing: "0.02em" })
        .to("#hero-monogram", { opacity: 1, y: 0, duration: 2.2, ease: "power2.out" })
        .to("#hero-monogram", { letterSpacing: "0.09em", duration: 1.6, ease: "power1.inOut" }, "<")
        .to("#hero-monogram", { duration: 0.5 })
        .to("#hero-monogram", { opacity: 0, y: -18, duration: 1.1, ease: "power2.in" })
        .fromTo("#hero-names", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4 }, "-=0.5")
        .fromTo("#hero-invite", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.7")
        .fromTo("#hero-date", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .fromTo("#hero-countdown", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .fromTo("#hero-actions", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .fromTo("#scroll-cue", { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=0.4");
}
function initScrollReveals() {
    const items = gsap.utils.toArray(".reveal");
    items.forEach((el, index) => {
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => el.classList.add("is-visible"),
            once: true,
        });
        void index;
    });
    gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
            },
        });
    });
}
function initParallax() {
    if (prefersReducedMotion)
        return;
    const hero = document.getElementById("hero");
    if (!hero)
        return;
    gsap.to("#atmosphere", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });
}
function initStaggeredGroups() {
    document.querySelectorAll("[data-stagger-group]").forEach((group) => {
        const children = Array.from(group.children);
        gsap.fromTo(children, { opacity: 0, y: 30 }, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
                trigger: group,
                start: "top 82%",
            },
        });
    });
}
export function initAnimations() {
    initScrollReveals();
    initStaggeredGroups();
    initParallax();
    playHeroSequence();
    window.addEventListener("load", () => ScrollTrigger.refresh());
}
