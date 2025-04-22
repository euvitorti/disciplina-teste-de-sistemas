// operations.js
import { showError, clearError } from './errorHandler.js';
import {
  isEmpty,
  hasInvalidChars,
  isDivideByZero,
  hasUnbalancedParens
} from './validation.js';

let history = JSON.parse(localStorage.getItem('calcHistory') || '[]');
const historyList = document.getElementById('history-list');

export function calculateResult() {
  clearError();
  const expr = display.value;
  if (isEmpty(expr))            { showError('Digite algo'); return; }
  if (hasInvalidChars(expr))    { showError('Expressão inválida'); return; }
  if (isDivideByZero(expr))     { showError('Divisão por zero!'); return; }
  if (hasUnbalancedParens(expr)){ showError('Parênteses desequilibrados'); return; }

  try {
    const result = new Function('return ' + expr)();
    if (!isFinite(result)) throw new Error();
    display.value = result;
    addToHistory(expr, result);
  } catch {
    showError('Erro no cálculo');
  }
}

function addToHistory(expr, result) {
  history.unshift({ expr, result });
  history = history.slice(0, 20);
  localStorage.setItem('calcHistory', JSON.stringify(history));
  renderHistory();
}

export function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(({ expr, result }) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${expr} = ${result}</span>
                    <button title="Recarregar">↺</button>`;
    li.querySelector('button').onclick = () => {
      display.value = expr;
      clearError();
      updateParenCount();
    };
    historyList.append(li);
  });
}

export function loadExample(expr) {
  clearError();
  display.value = expr;
  updateParenCount();
}
