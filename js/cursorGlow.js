import gsap from "gsap";
export function initCursorGlow() {
    const glow = document.getElementById("cursor-glow");
    if (!glow)
        return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || prefersReducedMotion)
        return;
    const quickX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const quickY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });
    window.addEventListener("mousemove", (e) => {
        quickX(e.clientX);
        quickY(e.clientY);
    });
}
