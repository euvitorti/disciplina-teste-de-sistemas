export function showError(msg) {
  const display = document.getElementById('display');
  const errorMessage = document.getElementById('error-message');
  display.classList.add('error');
  errorMessage.textContent = msg;
  setTimeout(clearError, 1500);
}

export function clearError() {
  const display = document.getElementById('display');
  const errorMessage = document.getElementById('error-message');
  display.classList.remove('error');
  errorMessage.textContent = '';
}