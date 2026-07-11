import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";
export async function initParticles() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion)
        return;
    await loadFull(tsParticles);
    await tsParticles.load({
        id: "tsparticles",
        options: {
            fullScreen: { enable: false },
            fpsLimit: 60,
            detectRetina: true,
            particles: {
                number: {
                    value: 46,
                    density: { enable: true, area: 900 },
                },
                color: { value: ["#D6C3A5", "#FAF7F2", "#B99562"] },
                shape: { type: "circle" },
                opacity: {
                    value: { min: 0.08, max: 0.55 },
                    animation: { enable: true, speed: 0.4, sync: false, startValue: "random" },
                },
                size: {
                    value: { min: 0.6, max: 2.4 },
                },
                links: { enable: false },
                move: {
                    enable: true,
                    direction: "top",
                    speed: { min: 0.15, max: 0.5 },
                    straight: false,
                    random: true,
                    outModes: { default: "out", top: "out", bottom: "none" },
                    drift: 0.05,
                },
            },
            interactivity: {
                events: { onHover: { enable: false }, onClick: { enable: false } },
            },
            background: { color: "transparent" },
        },
    });
}
