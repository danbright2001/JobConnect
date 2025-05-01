// Helper function to validate email format
export const emailFormat = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format';

// Helper function to validate required fields
export const required = (value) => (!value ? 'This field is required' : null);

// Helper function to validate minimum length
export const minLength = (min) => (value) =>
  value.length < min ? `Must be at least ${min} characters` : null;

// Helper function to show error messages
export function showError(fieldId, message) {
  const errorDiv = document.getElementById(`${fieldId}Error`);
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  } else {
    const field = document.getElementById(fieldId);
    if (field) {
      const div = document.createElement('div');
      div.id = `${fieldId}Error`;
      div.className = 'text-red-500 text-sm mt-1';
      div.textContent = message;
      field.parentNode.insertBefore(div, field.nextSibling);
    }
  }

  const input = document.getElementById(fieldId);
  if (input) {
    input.classList.add('border-red-500');
    input.classList.remove('border-gray-300', 'focus:border-blue-500');
  }
}

// Helper function to clear all errors
export function clearErrors() {
  // Clear error messages
  document.querySelectorAll('[id$="Error"]').forEach((el) => {
    el.textContent = '';
    el.classList.add('hidden');
  });

  // Reset input field styles
  document.querySelectorAll('input').forEach((input) => {
    input.classList.remove('border-red-500');
    input.classList.add('border-gray-300', 'focus:border-blue-500');
  });
}

// Helper function to validate a field with multiple rules
export function validateField(fieldId, value, rules) {
  for (const rule of rules) {
    const errorMessage = rule(value);
    if (errorMessage) {
      showError(fieldId, errorMessage);
      return false;
    }
  }
  return true;
}