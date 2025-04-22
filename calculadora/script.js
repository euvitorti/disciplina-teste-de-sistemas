const display = document.getElementById('display');
const errorMessage = document.getElementById('error-message');

// -----------------
//  Funções básicas
// -----------------

function appendToDisplay(char) {
  clearError();
  // Evita operadores duplicados no fim
  const lastChar = display.value.slice(-1);
  if (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(char)) {
    showError('Operador inválido');
    return;
  }
  // Evita múltiplos pontos no mesmo número
  if (char === '.' && /(\d*\.\d*)$/.test(display.value)) {
    showError('Já existe ponto decimal');
    return;
  }
  display.value += char;
}

function clearDisplay() {
  display.value = '';
  clearError();
}

// ---------------------
//  Cálculo e validação
// ---------------------

function calculateResult() {
  clearError();
  const expr = display.value.trim();

  if (!expr) {
    showError('Digite algo');
    return;
  }

  // Validação geral (só dígitos, espaços, operadores e parênteses)
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    showError('Expressão inválida');
    return;
  }

  // Detecta divisão por zero no texto (ex.: “/0” ou “/  00.0”)
  if (/\/\s*0+(\D|$)/.test(expr)) {
    showError('Divisão por zero!');
    return;
  }

  try {
    // calcula com Function() em vez de eval
    const result = new Function('return ' + expr)();
    if (!isFinite(result)) throw new Error('Resultado infinito');
    display.value = result;
  } catch (e) {
    showError('Erro no cálculo');
  }
}

// ---------------------
//   Tratamento de erros
// ---------------------

function showError(msg) {
  display.classList.add('error');
  errorMessage.textContent = msg;
  // remove o erro após 1.5s
  setTimeout(clearError, 1500);
}

function clearError() {
  display.classList.remove('error');
  errorMessage.textContent = '';
}

// ---------------------
// Atalhos de teclado
// ---------------------

display.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/().';
  // Enter = calcula
  if (e.key === 'Enter') {
    e.preventDefault();
    calculateResult();
    return;
  }
  // Backspace, Delete, setas = ok
  if (['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key)) {
    clearError();
    return;
  }
  // se for permitido, ok
  if (allowed.includes(e.key)) {
    clearError();
    // tratar ponto extra e operadores duplicados
    if (e.key === '.') {
      if (/(\d*\.\d*)$/.test(display.value)) {
        e.preventDefault();
        showError('Já existe ponto decimal');
      }
    }
    const last = display.value.slice(-1);
    if (/[+\-*/.]/.test(last) && /[+\-*/.]/.test(e.key)) {
      e.preventDefault();
      showError('Operador inválido');
    }
    return;
  }
  // bloqueia letras/outros
  e.preventDefault();
  showError('Somente números e operadores');
});

// Impede colar texto inválido
display.addEventListener('paste', (e) => {
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^[0-9+\-*/().\s]+$/.test(paste)) {
    e.preventDefault();
    showError('Conteúdo inválido');
  }
});
