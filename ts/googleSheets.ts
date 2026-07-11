import { GOOGLE_SHEETS_WEB_APP_URL } from "./config.js";
import type { RsvpSubmission } from "./types.js";

export async function submitRsvpToSheet(data: RsvpSubmission): Promise<void> {
  if (!GOOGLE_SHEETS_WEB_APP_URL || GOOGLE_SHEETS_WEB_APP_URL.includes("YOUR_DEPLOYMENT_ID")) {
    throw new Error(
      "Google Sheets isn't connected yet — set GOOGLE_SHEETS_WEB_APP_URL in ts/config.ts (see README)."
    );
  }

  await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  });
}
