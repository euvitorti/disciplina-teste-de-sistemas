// Atualiza contador de parênteses abertos e valida desequilíbrios
const parenCountEl = document.getElementById('paren-count');
import { showError, clearError } from 'errors.js';

export function updateParenCount(display) {
  const open = (display.value.match(/\(/g) || []).length;
  const close = (display.value.match(/\)/g) || []).length;
  parenCountEl.textContent = `Parênteses abertos: ${open - close}`;
  if (open < close) showError('Parênteses desequilibrados');
}

export function watchDisplayInput(display) {
  clearError();
  updateParenCount(display);
}