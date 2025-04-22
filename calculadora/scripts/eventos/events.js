// Configura atalhos de teclado e bloqueio de colagem inválida
import { calculateResult }           from '../calculadora/calculator.js';
import { showError, clearError }     from '../error/errors.js';
import { updateParenCount }          from '../parenteses/parencount.js';


export function setupKeyboardShortcuts(display, history) {
  display.addEventListener('keydown', (e) => {
    const allowed = '0123456789+-*/().';
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateResult(display, history);
      return;
    }
    // Reseta erros em teclas de navegação e edição
    if (['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key)) {
      clearError();
      return;
    }
    // Valida teclas de número e operador
    if (allowed.includes(e.key)) {
      clearError();
      if (e.key === '.' && /(?:\d*\.\d*)$/.test(display.value)) {
        e.preventDefault();
        showError('Já existe ponto decimal');
      }
      const last = display.value.slice(-1);
      if (/[+\-*/.]/.test(last) && /[+\-*/.]/.test(e.key)) {
        e.preventDefault();
        showError('Operador inválido');
      }
      return;
    }
    // Bloqueia qualquer outra tecla
    e.preventDefault();
    showError('Somente números e operadores');
  });
}

export function setupPasteHandler(display) {
  display.addEventListener('paste', (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^[0-9+\-*/().\s]+$/.test(paste)) {
      e.preventDefault();
      showError('Conteúdo inválido');
    }
  });
}