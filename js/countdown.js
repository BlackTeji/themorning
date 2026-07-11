import { WEDDING_DATE_ISO } from "./config.js";
function getRefs() {
    const days = document.getElementById("cd-days");
    const hours = document.getElementById("cd-hours");
    const minutes = document.getElementById("cd-minutes");
    const seconds = document.getElementById("cd-seconds");
    if (!days || !hours || !minutes || !seconds)
        return null;
    return { days, hours, minutes, seconds };
}
function pad(value) {
    return value.toString().padStart(2, "0");
}
export function initCountdown() {
    const refs = getRefs();
    if (!refs)
        return;
    const targetTime = new Date(WEDDING_DATE_ISO).getTime();
    const tick = () => {
        const now = Date.now();
        const diff = targetTime - now;
        if (diff <= 0) {
            refs.days.textContent = "00";
            refs.hours.textContent = "00";
            refs.minutes.textContent = "00";
            refs.seconds.textContent = "00";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        refs.days.textContent = pad(days);
        refs.hours.textContent = pad(hours);
        refs.minutes.textContent = pad(minutes);
        refs.seconds.textContent = pad(seconds);
    };
    tick();
    window.setInterval(tick, 1000);
}
