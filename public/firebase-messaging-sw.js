// Firebase Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCKFaezN7PQoDXKV1PN3WVaq75uOuL_IPM",
    authDomain: "kompani-ndertimi.firebaseapp.com",
    projectId: "kompani-ndertimi",
    storageBucket: "kompani-ndertimi.appspot.com",
    messagingSenderId: "127617797229",
    appId: "1:127617797229:web:17e6945be1b8eaa4fac364",
    measurementId: "G-6RHJ4HWPK6"
});

const messaging = firebase.messaging();
const db = firebase.firestore();

// Ruaj notification në Firestore kur vjen në background
messaging.onBackgroundMessage(async (payload) => {
    const { title, body } = payload.notification || {};
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    // Shfaq browser notification
    self.registration.showNotification(title, { body });

    // Ruaj në Firestore
    try {
        await db.collection("notifications").add({
            title,
            body,
            read: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Notification saved to Firestore (background).");
    } catch (error) {
        console.error("Error saving notification in SW:", error);
    }
});
