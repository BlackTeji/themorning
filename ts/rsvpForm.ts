import gsap from "gsap";
import { submitRsvp } from "./rsvpBackend.js";
import type { RsvpSubmission } from "./types.js";

function setFieldError(fieldId: string, message: string): void {
  const errorEl = document.querySelector<HTMLElement>(`[data-error-for="${fieldId}"]`);
  if (errorEl) errorEl.textContent = message;
}

function clearErrors(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>(".form-error").forEach((el) => (el.textContent = ""));
}

function validate(form: HTMLFormElement): RsvpSubmission | null {
  clearErrors(form);
  let isValid = true;

  const fullName = (form.elements.namedItem("fullName") as HTMLInputElement)?.value.trim() ?? "";
  const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim() ?? "";
  const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value.trim() ?? "";
  const attendingInput = form.querySelector<HTMLInputElement>('input[name="attending"]:checked');
  const guestCountRaw = (form.elements.namedItem("guestCount") as HTMLInputElement)?.value ?? "1";
  const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim() ?? "";

  if (fullName.length < 2) {
    setFieldError("fullName", "Please share your full name.");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  if (phone.length < 7) {
    setFieldError("phone", "Please share a contact number.");
    isValid = false;
  }

  if (!attendingInput) {
    setFieldError("attending", "Please let us know if you'll attend.");
    isValid = false;
  }

  const guestCount = Number.parseInt(guestCountRaw, 10);
  if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 10) {
    setFieldError("guestCount", "Please enter a number between 1 and 10.");
    isValid = false;
  }

  if (!isValid) return null;

  return {
    fullName,
    email,
    phone,
    attending: (attendingInput!.value as "yes" | "no"),
    guestCount,
    message,
    submittedAt: new Date().toISOString(),
  };
}

function playConfirmation(card: HTMLElement, confirmation: HTMLElement): void {
  confirmation.classList.add("is-active");
  const tl = gsap.timeline();
  tl.to(card.querySelector("form"), { opacity: 0, duration: 0.4, ease: "power2.out" })
    .set(confirmation, { opacity: 0 })
    .to(confirmation, { opacity: 1, duration: 0.8, ease: "power2.out" })
    .fromTo(
      confirmation.querySelector(".confirmation-mark"),
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(
      [confirmation.querySelector(".confirmation-title"), confirmation.querySelector(".confirmation-text")],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
      "-=0.3"
    );
}

export function initRsvpForm(): void {
  const form = document.getElementById("rsvp-form") as HTMLFormElement | null;
  const card = document.getElementById("rsvp-card");
  const confirmation = document.getElementById("rsvp-confirmation");
  const submitBtn = document.getElementById("rsvp-submit") as HTMLButtonElement | null;

  if (!form || !card || !confirmation || !submitBtn) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = validate(form);
    if (!payload) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      await submitRsvp(payload);
      playConfirmation(card, confirmation);
      form.reset();
    } catch (error) {
      console.error("RSVP submission failed:", error);
      setFieldError("fullName", "Something went wrong — please try again in a moment.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send RSVP";
    }
  });
}
