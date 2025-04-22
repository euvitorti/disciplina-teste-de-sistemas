export function validateExpression(expr) {
  if (!expr.trim())
    return 'Digite algo';
  if (!/^[0-9+\-*/().\s]+$/.test(expr))
    return 'Expressão inválida';
  if (/\/\s*0+(?:\D|$)/.test(expr))
    return 'Divisão por zero!';
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  if (open !== close)
    return 'Parênteses desequilibrados';
  return null;
}

export function initPasteGuard(displayEl) {
  displayEl.addEventListener('paste', (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^[0-9+\-*/().\s]+$/.test(paste)) {
      e.preventDefault();
      showError('Conteúdo inválido');
    }
  });
}