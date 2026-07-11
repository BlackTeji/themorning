import { submitRsvpToSheet } from "./googleSheets.js";
export async function submitRsvp(data) {
    const { submitRsvpToFirestore } = await import("./firebase.js");
    const [firestoreResult, sheetsResult] = await Promise.allSettled([
        submitRsvpToFirestore(data),
        submitRsvpToSheet(data),
    ]);
    if (firestoreResult.status === "rejected" && sheetsResult.status === "rejected") {
        throw new Error(`Both RSVP backends failed. Firestore: ${firestoreResult.reason}. Google Sheets: ${sheetsResult.reason}.`);
    }
    if (firestoreResult.status === "rejected") {
        console.warn("RSVP saved to Google Sheets, but Firestore failed:", firestoreResult.reason);
    }
    if (sheetsResult.status === "rejected") {
        console.warn("RSVP saved to Firestore, but Google Sheets failed:", sheetsResult.reason);
    }
}
