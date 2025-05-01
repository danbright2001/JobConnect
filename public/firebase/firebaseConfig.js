import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi752iLwRRIryvwsCLI9gaGCvUMwZZOzs",
  authDomain: "auth-out.firebaseapp.com",
  projectId: "auth-out",
  storageBucket: "auth-out.appspot.com",
  messagingSenderId: "859394186307",
  appId: "1:859394186307:web:66d1b6a46f4cee5e0d88f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);