// Verifica se a expressão está vazia (sem conteúdo após remover espaços)
export function isEmpty(expr) {
  return expr.trim() === '';  // Retorna true se a expressão estiver vazia
}

// Verifica se a expressão contém caracteres inválidos
export function hasInvalidChars(expr) {
  // Verifica se a expressão contém apenas números, operadores, parênteses e espaços
  return !/^[0-9+\-*/().\s]+$/.test(expr);  // Retorna true se contiver caracteres inválidos
}

// Verifica se a expressão tenta dividir por zero
export function isDivideByZero(expr) {
  // Verifica se há uma divisão por zero (por exemplo, "/ 0" ou "/ 000")
  return /\/\s*0+(?:\D|$)/.test(expr);  // Retorna true se a expressão contiver divisão por zero
}

// Verifica se os parênteses estão balanceados (número de '(' e ')')
export function hasUnbalancedParens(expr) {
  const open  = (expr.match(/\(/g) || []).length;  // Conta o número de parênteses abertos
  const close = (expr.match(/\)/g) || []).length; // Conta o número de parênteses fechados
  return open !== close;  // Retorna true se o número de parênteses abertos e fechados for diferente
}

// Verifica se há operadores consecutivos na expressão
export function hasConsecutiveOperators(displayValue, char) {
  const last = displayValue.slice(-1);  // Obtém o último caractere da expressão atual
  return /[+\-*/.]/.test(last) && /[+\-*/.]/.test(char);  // Retorna true se o último caractere e o novo são operadores
}

// Verifica se já existe um ponto decimal na parte decimal da expressão
export function hasExtraDecimal(displayValue) {
  // Verifica se a expressão já possui um ponto decimal antes do número atual
  return /(?:\d*\.\d*)$/.test(displayValue);  // Retorna true se já houver um ponto decimal
}
