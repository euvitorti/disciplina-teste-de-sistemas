// errorHandler.js
const display = document.getElementById('display');
const errorMessage = document.getElementById('error-message');

export function showError(msg) {
  display.classList.add('error');
  errorMessage.textContent = msg;
  setTimeout(clearError, 1500);
}

export function clearError() {
  display.classList.remove('error');
  errorMessage.textContent = '';
}
