export function initShortcuts(displayEl, calculateFn) {
  displayEl.addEventListener('keydown', (e) => {
    const allowed = '0123456789+-*/().';
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateFn();
      return;
    }
    if (['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key)) {
      clearError();
      return;
    }
    if (allowed.includes(e.key)) {
      clearError();
      if (e.key === '.' && /(?:\d*\.\d*)$/.test(displayEl.value)) {
        e.preventDefault();
        showError('Já existe ponto decimal');
      }
      const last = displayEl.value.slice(-1);
      if (/[+\-*/.]/.test(last) && /[+\-*/.]/.test(e.key)) {
        e.preventDefault();
        showError('Operador inválido');
      }
      return;
    }
    e.preventDefault();
    showError('Somente números e operadores');
  });
}