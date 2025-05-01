import { signIn } from '../firebase/authServices.js';
import { clearErrors, showError } from './authHelpers.js';

document.getElementById("signInForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Validation flags
  let isValid = true;

  // Email validation
  if (email === '') {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('email', 'Please enter a valid email');
    isValid = false;
  }

  // Password validation
  if (password === '') {
    showError('password', 'Password is required');
    isValid = false;
  }

  if (isValid) {
    try {
      const user = await signIn(email, password);
      console.log("User signed in:", user);

      // Redirect after successful sign in
      window.location.href = "../userDashboard/dashboard.html"; // Adjust the path as needed
    } catch (error) {
      console.error("Error:", error);

      // Handle specific Firebase errors
      let errorMessage = "An error occurred during sign in.";
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "No account found with this email.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many attempts. Try again later.";
          break;
      }

      showError('form', errorMessage);
    }
  }
});

// Helper function to validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}