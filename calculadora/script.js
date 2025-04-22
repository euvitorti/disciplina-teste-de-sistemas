const display = document.getElementById('display');
const errorMessage = document.getElementById('error-message');
const historyList = document.getElementById('history-list');
const parenCountEl = document.getElementById('paren-count');
const themeToggle = document.getElementById('theme-toggle');

// Inicia tema
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = 'Modo Claro';
}

// Toggler de tema
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const tema = document.body.classList.contains('dark') ? 'dark' : 'light';
  themeToggle.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Escuro';
  localStorage.setItem('theme', tema);
});

// Carrega e exibe histórico
let history = JSON.parse(localStorage.getItem('calcHistory') || '[]');
function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(({ expr, result }) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `${expr} = ${result}`;
    const btn = document.createElement('button');
    btn.textContent = '↺';
    btn.title = 'Recarregar';
    btn.onclick = () => {
      display.value = expr;
      clearError();
      updateParenCount();
    };
    li.append(span, btn);
    historyList.append(li);
  });
}
renderHistory();

// Atualiza contador de parênteses
function updateParenCount() {
  const open = (display.value.match(/\(/g) || []).length;
  const close = (display.value.match(/\)/g) || []).length;
  parenCountEl.textContent = `Parênteses abertos: ${open - close}`;
  if (open < close) showError('Parênteses desequilibrados');
}
display.addEventListener('input', () => {
  clearError();
  updateParenCount();
});

// Manipulação do display
function appendToDisplay(char) {
  clearError();
  const lastChar = display.value.slice(-1);
  if (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(char)) {
    showError('Operador inválido');
    return;
  }
  if (char === '.' && /(?:\d*\.\d*)$/.test(display.value)) {
    showError('Já existe ponto decimal');
    return;
  }
  display.value += char;
  updateParenCount();
}
function deleteLast() {
  clearError();
  display.value = display.value.slice(0, -1);
  updateParenCount();
}
function clearDisplay() {
  display.value = '';
  clearError();
  updateParenCount();
}

// Cálculo e validações
function calculateResult() {
  clearError();
  const expr = display.value.trim();
  if (!expr) {
    showError('Digite algo');
    return;
  }
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    showError('Expressão inválida');
    return;
  }
  if (/\/\s*0+(?:\D|$)/.test(expr)) {
    showError('Divisão por zero!');
    return;
  }
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  if (open !== close) {
    showError('Parênteses desequilibrados');
    return;
  }
  try {
    const result = new Function('return ' + expr)();
    if (!isFinite(result)) throw new Error();
    display.value = result;
    history.unshift({ expr, result });
    history = history.slice(0, 20);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    renderHistory();
    updateParenCount();
  } catch {
    showError('Erro no cálculo');
  }
}

// Exemplos carregáveis
function loadExample(expr) {
  clearError();
  display.value = expr;
  updateParenCount();
}

// Funções de erro
function showError(msg) {
  display.classList.add('error');
  errorMessage.textContent = msg;
  setTimeout(clearError, 1500);
}
function clearError() {
  display.classList.remove('error');
  errorMessage.textContent = '';
}

// Atalhos de teclado
display.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/().';
  if (e.key === 'Enter') {
    e.preventDefault();
    calculateResult();
    return;
  }
  if (['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key)) {
    clearError();
    return;
  }
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
  e.preventDefault();
  showError('Somente números e operadores');
});

// Bloqueio de colagem inválida
display.addEventListener('paste', (e) => {
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^[0-9+\-*/().\s]+$/.test(paste)) {
    e.preventDefault();
    showError('Conteúdo inválido');
  }
});
