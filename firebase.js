import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  browserSessionPersistence,
  browserLocalPersistence,
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  signOut
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const configResponse = await fetch("/api/config/firebase");
const firebaseConfig = await configResponse.json().catch(() => null);
if (!configResponse.ok || !firebaseConfig) {
  throw new Error(firebaseConfig?.message || "Firebase web configuration could not be loaded.");
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export {
  browserSessionPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  setPersistence,
  signOut
};