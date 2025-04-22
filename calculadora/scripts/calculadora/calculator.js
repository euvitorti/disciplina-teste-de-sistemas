import { validateExpression } from '../validation/validation.js';
import { saveToHistory } from '../historico/history.js';

export function calculateResult(displayEl, historyListEl, updateParenFn) {
  clearError();
  const expr = displayEl.value;
  const error = validateExpression(expr);
  if (error) {
    showError(error);
    return;
  }

  try {
    const result = new Function('return ' + expr)();
    if (!isFinite(result)) throw new Error();
    displayEl.value = result;
    saveToHistory(expr, result, historyListEl, updateParenFn);
    updateParenFn();
  } catch {
    showError('Erro no cálculo');
  }
}