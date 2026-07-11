import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_CONFIG, FIRESTORE_COLLECTION } from "./config.js";
let db = null;
function getDb() {
    if (!db) {
        const app = initializeApp(FIREBASE_CONFIG);
        db = getFirestore(app);
    }
    return db;
}
export async function submitRsvpToFirestore(data) {
    const firestore = getDb();
    await addDoc(collection(firestore, FIRESTORE_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
    });
}
