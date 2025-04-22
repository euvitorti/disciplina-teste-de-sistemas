export function updateParenCount(displayEl, parenCountEl) {
  const open = (displayEl.value.match(/\(/g) || []).length;
  const close = (displayEl.value.match(/\)/g) || []).length;
  parenCountEl.textContent = `Parênteses abertos: ${open - close}`;
  if (open < close) showError('Parênteses desequilibrados');
}

export function appendToDisplay(displayEl, char, updateParenFn) {
  clearError();
  const lastChar = displayEl.value.slice(-1);
  if (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(char)) {
    showError('Operador inválido');
    return;
  }
  if (char === '.' && /(?:\d*\.\d*)$/.test(displayEl.value)) {
    showError('Já existe ponto decimal');
    return;
  }
  displayEl.value += char;
  updateParenFn();
}

export function deleteLast(displayEl, updateParenFn) {
  clearError();
  displayEl.value = displayEl.value.slice(0, -1);
  updateParenFn();
}

export function clearDisplay(displayEl, updateParenFn) {
  displayEl.value = '';
  clearError();
  updateParenFn();
}