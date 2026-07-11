import { GIFT_ACCOUNT } from "./config.js";

export function initGiftModal(): void {
  const trigger = document.getElementById("gift-details-trigger");
  const modal = document.getElementById("gift-modal");
  const closeBtn = document.getElementById("gift-modal-close");
  const overlay = modal?.querySelector<HTMLElement>("[data-gift-close]");
  const copyBtn = document.getElementById("gift-account-copy") as HTMLButtonElement | null;
  const numberText = document.getElementById("gift-account-number-text");
  const bankName = document.getElementById("gift-bank-name");
  const accountName = document.getElementById("gift-account-name");
  const feedback = document.getElementById("gift-copy-feedback");

  if (!trigger || !modal || !closeBtn || !copyBtn || !numberText || !bankName || !accountName || !feedback) return;

  numberText.textContent = GIFT_ACCOUNT.accountNumber;
  bankName.textContent = GIFT_ACCOUNT.bankName;
  accountName.textContent = GIFT_ACCOUNT.accountName;

  let lastFocused: HTMLElement | null = null;

  const open = () => {
    lastFocused = trigger as HTMLElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    feedback.textContent = "";
    lastFocused?.focus();
  };

  trigger.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(GIFT_ACCOUNT.accountNumber);
      feedback.textContent = "Copied to clipboard";
    } catch {
      feedback.textContent = "Couldn't copy — please copy manually";
    }
    window.setTimeout(() => {
      feedback.textContent = "";
    }, 2500);
  });
}
