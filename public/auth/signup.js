import { signUp } from '../firebase/authServices.js';
import { validateField, required, minLength, emailFormat, clearErrors, showError } from './authHelpers.js';

document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const cpassword = document.getElementById('cpassword').value;

  // Validate form fields
  let isValid = true;
  isValid = validateField('name', name, [required]) && isValid;
  isValid = validateField('email', email, [required, emailFormat]) && isValid;
  isValid = validateField('password', password, [required, minLength(6)]) && isValid;
  isValid = validateField('cpassword', cpassword, [
    required,
    (value) => (value !== password ? 'Passwords do not match' : null),
  ]) && isValid;

  // If validation passes, proceed with Firebase authentication
  if (isValid) {
    try {
      // Assign the default role as "user"
      const role = "user";

      const user = await signUp(email, password, name, role);
      console.log("User created:", user);

      // Redirect after successful signup
      window.location.href = "signin.html";
    } catch (error) {
      console.error("Error:", error);

      // Handle specific Firebase errors
      let errorMessage = "An error occurred during sign up.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already in use.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters.";
          break;
        default:
          errorMessage = error.message;
      }

      // Show error message
      showError('form', errorMessage);
    }
  }
});