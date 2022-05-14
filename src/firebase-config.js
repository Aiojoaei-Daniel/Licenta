import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "@firebase/firestore";
// import { getMessaging, onMessage, getToken } from "firebase/messaging";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// export const messaging = getMessaging(app);
// export const messaging = firebase.messaging();

export const db = getFirestore(app);
export const auth = app.auth();
export default app;

// export const requestForToken = async (setTokenFound) => {
//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey:
//         "BEK3n561TeohNxjhEOdiRFZgAUytoQZM2QWz7MjfsVRqRhFGxm8ZCCJk3UlPLv5rF7ZG6K4pq8c7UXqLjxxSo38",
//     });
//     if (currentToken) {
//       console.log("current token for client: ", currentToken);
//       setTokenFound(true);
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       setTokenFound(false);
//     }
//   } catch (err) {
//     console.log("An error occurred while retrieving token. ", err);
//   }
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payload", payload);
//       resolve(payload);
//     });
//   });

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
