// validation.js
export function isEmpty(expr) {
  return expr.trim() === '';
}

export function hasInvalidChars(expr) {
  return !/^[0-9+\-*/().\s]+$/.test(expr);
}

export function isDivideByZero(expr) {
  return /\/\s*0+(?:\D|$)/.test(expr);
}

export function hasUnbalancedParens(expr) {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  return open !== close;
}

export function hasConsecutiveOperators(displayValue, char) {
  const last = displayValue.slice(-1);
  return /[+\-*/.]/.test(last) && /[+\-*/.]/.test(char);
}

export function hasExtraDecimal(displayValue) {
  return /(?:\d*\.\d*)$/.test(displayValue);
}
