// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCKFaezN7PQoDXKV1PN3WVaq75uOuL_IPM",
    authDomain: "kompani-ndertimi.firebaseapp.com",
    projectId: "kompani-ndertimi",
    storageBucket: "kompani-ndertimi.appspot.com",
    messagingSenderId: "127617797229",
    appId: "1:127617797229:web:17e6945be1b8eaa4fac364",
    measurementId: "G-6RHJ4HWPK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore(app);

// Kërkon lejen për njoftime
export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
    return permission;
};

// Regjistron service worker
const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) return null;

    try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("✅ Service Worker registered:", registration);
        return registration;
    } catch (err) {
        console.error("❌ Service Worker registration failed:", err);
        return null;
    }
};

// Merr token-in e Firebase
export const getFirebaseToken = async () => {
    try {
        const permission = await requestNotificationPermission();
        if (permission !== "granted") return null;

        const registration = await registerServiceWorker();
        if (!registration) return null;

        const token = await getToken(messaging, {
            vapidKey: "BPACC6VbKln6M4nqTSOvrsWg6H6aRkOWCjSivQqfAtGsT0aaygiBEpO0wDx1j0k5qlvCis9QH2y-tTmmPGM_3yo",
            serviceWorkerRegistration: registration
        });

        console.log("🔥 Firebase Token:", token);
        return token;
    } catch (error) {
        console.error("Error getting Firebase token:", error);
        return null;
    }
};

// Ruaj njoftim (global ose privat)
export const saveNotificationToFirestore = async (payload, userEmail = null) => {
    const { title, body } = payload.notification || {};
    if (!title || !body) return;

    try {
        await addDoc(collection(db, "notifications"), {
            title: {
                en: title.en || title || "New Notification",
                al: title.al || title || "Njoftim i Ri"
            },
            body: {
                en: body.en || body || "",
                al: body.al || body || ""
            },
            read: false,
            timestamp: serverTimestamp(),
            userEmail: userEmail ? userEmail.toLowerCase() : null // vetem për përdorues specifik
        });
        console.log("💾 Notification saved for", userEmail || "everyone");
    } catch (err) {
        console.error("Error saving notification:", err);
    }
};

// Menaxhon mesazhet në foreground
export const onForegroundMessage = (callback) => {
    onMessage(messaging, (payload) => {
        console.log("📩 Foreground message received:", payload);
        callback(payload);
    });
};
