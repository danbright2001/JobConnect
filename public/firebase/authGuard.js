import { auth } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Function to protect a page by checking authentication
export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Redirect to the sign-in page if the user is not authenticated
      window.location.href = "auth/signin.html";
    }
  });
}

// Function to handle logout
export async function logout() {
  try {
    await signOut(auth);
    window.location.href = "../auth/signin.html";
  } catch (error) {
    console.error("Error logging out:", error);
  }
}