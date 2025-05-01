import { auth } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { db } from './firebaseConfig.js';

// Sign up a new user and save their name and role to Firestore
export async function signUp(email, password, name, role = "user") {
  try {
    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save the user's name and role to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: role, // Assign the role here
      createdAt: new Date()
    });

    return user;
  } catch (error) {
    throw error;
  }
}

// Sign in an existing user
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Sign out the current user
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    throw error;
  }
}