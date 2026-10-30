import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getDatabase, ref, onValue, get, set, update, remove, push, query,
  limitToLast, serverTimestamp, onDisconnect
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

export { ref, onValue, get, set, update, remove, push, query, limitToLast, serverTimestamp, onDisconnect };

const app = initializeApp({
  apiKey:      "AIzaSyCdNbFoMY1DpqE_U3u8NlG4igqfNG4PZmY",
  authDomain:  "legendstimer-e29b8.firebaseapp.com",
  databaseURL: "https://legendstimer-e29b8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:   "legendstimer-e29b8"
});

export const auth = getAuth(app);
export const db = getDatabase(app);

/* Firebase wymaga adresu e-mail, a gracze mają tylko login: ta domena nie przyjmuje poczty */
const toEmail = (login) => login + "@legendstimer.invalid";

export const cleanLogin = (s) => String(s || "").trim().toLowerCase();
export const validLogin = (s) => /^[a-z0-9_-]{3,20}$/.test(s);
export const cleanGameNick = (s) => Array.from(String(s || ""))
  .filter(ch => { const c = ch.charCodeAt(0); return c > 31 && c !== 127; })
  .join("").trim().slice(0, 20);

export const isStaff = (profile) => !!profile && (profile.role === "owner" || profile.role === "admin");

const ERRORS = {
  "auth/invalid-credential": "Błędny login lub hasło.",
  "auth/wrong-password": "Błędny login lub hasło.",
  "auth/user-not-found": "Błędny login lub hasło.",
  "auth/email-already-in-use": "Ten login jest już zajęty.",
  "auth/weak-password": "Hasło musi mieć co najmniej 6 znaków.",
  "auth/too-many-requests": "Za dużo prób. Spróbuj za kilka minut.",
  "auth/operation-not-allowed": "Logowanie nie jest jeszcze włączone.",
  "auth/configuration-not-found": "Logowanie nie jest jeszcze włączone.",
  "auth/network-request-failed": "Brak połączenia. Spróbuj ponownie."
};
export const errorText = (e) => ERRORS[e && e.code] || "Coś poszło nie tak. Spróbuj ponownie.";

let registering = false;

export async function register({ login, password, gameNick }) {
  registering = true;
  try {
    const cred = await createUserWithEmailAndPassword(auth, toEmail(login), password);
    await set(ref(db, "users/" + cred.user.uid), {
      login, gameNick, status: "pending", role: "user", createdAt: serverTimestamp()
    });
  } finally {
    registering = false;
  }
}

export const signIn = (login, password) => signInWithEmailAndPassword(auth, toEmail(login), password);
export const logOut = () => signOut(auth);

/* cb({ state: guest | pending | approved | banned | deleted, uid, profile }) */
export function watchAccount(cb) {
  let stopProfile = null;
  onAuthStateChanged(auth, (user) => {
    if (stopProfile) { stopProfile(); stopProfile = null; }
    if (!user) { cb({ state: "guest" }); return; }
    stopProfile = onValue(ref(db, "users/" + user.uid), (snap) => {
      const profile = snap.val();
      if (!profile) {
        if (!registering) cb({ state: "deleted", uid: user.uid });
        return;
      }
      cb({ state: profile.status, uid: user.uid, profile });
    }, () => cb({ state: "deleted", uid: user.uid }));
  });
}

export const firstAccount = () => new Promise(resolve => {
  let done = false;
  watchAccount(acc => { if (!done) { done = true; resolve(acc); } else if (acc.state !== "approved") location.reload(); });
});

/* widoczność na liście online; wpis znika sam po zamknięciu karty */
export function startPresence(uid, gameNick) {
  const me = ref(db, "presence/" + uid);
  onValue(ref(db, ".info/connected"), (snap) => {
    if (!snap.val()) return;
    onDisconnect(me).remove();
    set(me, { n: gameNick, at: serverTimestamp() }).catch(() => {});
  });
}
