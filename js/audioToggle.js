export function initAudioToggle() {
    const toggle = document.getElementById("audio-toggle");
    const audio = document.getElementById("ambient-audio");
    if (!toggle || !audio)
        return;
    audio.volume = 0.35;
    toggle.setAttribute("data-audio-on", "false");
    toggle.setAttribute("aria-pressed", "false");
    toggle.addEventListener("click", () => {
        const isOn = toggle.getAttribute("data-audio-on") === "true";
        if (isOn) {
            audio.pause();
            toggle.setAttribute("data-audio-on", "false");
            toggle.setAttribute("aria-pressed", "false");
            toggle.setAttribute("aria-label", "Play ambient music");
        }
        else {
            audio.play().catch(() => {
            });
            toggle.setAttribute("data-audio-on", "true");
            toggle.setAttribute("aria-pressed", "true");
            toggle.setAttribute("aria-label", "Pause ambient music");
        }
    });
}
