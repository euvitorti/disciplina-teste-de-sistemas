import { hasConsecutiveOperators, hasExtraDecimal } from './validation.js';
import { showError, clearError }       from './errorHandler.js';
import { calculateResult, renderHistory, loadExample } from './operations.js';

const display       = document.getElementById('display');
const parenCountEl  = document.getElementById('paren-count');
const themeToggle   = document.getElementById('theme-toggle');

// — tema —
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = 'Modo Claro';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const tema = document.body.classList.contains('dark') ? 'dark' : 'light';
  themeToggle.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Escuro';
  localStorage.setItem('theme', tema);
});

// — histórico —
renderHistory();

// — contador de parênteses —
function updateParenCount() {
  const open  = (display.value.match(/\(/g) || []).length;
  const close = (display.value.match(/\)/g) || []).length;
  parenCountEl.textContent = `Parênteses abertos: ${open - close}`;
  if (open < close) showError('Parênteses desequilibrados');
}
display.addEventListener('input', () => {
  clearError();
  updateParenCount();
});

// — display handlers —
window.appendToDisplay = char => {
  clearError();
  if (hasConsecutiveOperators(display.value, char)) {
    showError('Operador inválido'); return;
  }
  if (char === '.' && hasExtraDecimal(display.value)) {
    showError('Já existe ponto decimal'); return;
  }
  display.value += char;
  updateParenCount();
};

window.deleteLast = () => { clearError(); display.value = display.value.slice(0, -1); updateParenCount(); };
window.clearDisplay = () => { display.value = ''; clearError(); updateParenCount(); };

// — cálculo e exemplos —
window.calculateResult = calculateResult;
window.loadExample     = loadExample;

// — atalhos de teclado e paste —
display.addEventListener('keydown', e => {
  const allowed = '0123456789+-*/().';
  if (e.key === 'Enter')       { e.preventDefault(); calculateResult(); }
  else if (['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key)) { clearError(); }
  else if (allowed.includes(e.key)) {
    clearError();
    if (e.key === '.' && hasExtraDecimal(display.value)) { e.preventDefault(); showError('Já existe ponto decimal'); }
    else if (/[+\-*/.]/.test(display.value.slice(-1)) && /[+\-*/.]/.test(e.key)) {
      e.preventDefault(); showError('Operador inválido');
    }
  } else { e.preventDefault(); showError('Somente números e operadores'); }
});
display.addEventListener('paste', e => {
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^[0-9+\-*/().\s]+$/.test(paste)) {
    e.preventDefault();
    showError('Conteúdo inválido');
  }
});
