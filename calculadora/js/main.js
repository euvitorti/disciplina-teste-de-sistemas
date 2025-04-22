import { hasConsecutiveOperators, hasExtraDecimal } from './validation.js';  // Validações para operadores consecutivos e ponto decimal extra
import { showError, clearError }       from './errorHandler.js';  // Funções para exibir e limpar erros
import { calculateResult, renderHistory, loadExample } from './operations.js';  // Funções para calcular resultados, renderizar histórico e carregar exemplos

// Obtém elementos do DOM para manipulação
const display       = document.getElementById('display');       // Tela de exibição da calculadora
const parenCountEl  = document.getElementById('paren-count');  // Elemento que exibe o contador de parênteses
const themeToggle   = document.getElementById('theme-toggle'); // Botão para alternar entre modos de tema (claro/escuro)

// — Tema —
// Verifica se o tema salvo no localStorage é "escuro", e aplica o tema escuro ao corpo da página
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');  // Adiciona a classe 'dark' ao corpo
  themeToggle.textContent = 'Modo Claro'; // Altera o texto do botão para 'Modo Claro'
}

// Adiciona um evento de clique no botão para alternar entre os temas claro e escuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');  // Alterna entre os temas
  const tema = document.body.classList.contains('dark') ? 'dark' : 'light';  // Define o tema atual
  themeToggle.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Escuro';  // Altera o texto do botão
  localStorage.setItem('theme', tema);  // Salva o tema no localStorage
});

// — Histórico —
// Renderiza o histórico de cálculos salvos no localStorage
renderHistory();

// — Contador de parênteses —
// Atualiza o contador de parênteses abertos
function updateParenCount() {
  const open  = (display.value.match(/\(/g) || []).length;  // Conta os parênteses de abertura
  const close = (display.value.match(/\)/g) || []).length;  // Conta os parênteses de fechamento
  parenCountEl.textContent = `Parênteses abertos: ${open - close}`;  // Exibe a quantidade de parênteses abertos
  if (open < close) showError('Parênteses desequilibrados');  // Se os parênteses estiverem desequilibrados, exibe erro
}

// Adiciona um evento de entrada para o display para atualizar o contador de parênteses e limpar erros
display.addEventListener('input', () => {
  clearError();  // Limpa qualquer erro existente
  updateParenCount();  // Atualiza o contador de parênteses
});

// — Manipulação do display —
// Função para adicionar caracteres ao display
window.appendToDisplay = char => {
  clearError();  // Limpa erros ao adicionar um novo caractere
  if (hasConsecutiveOperators(display.value, char)) {  // Verifica se há operadores consecutivos
    showError('Operador inválido'); return;
  }
  if (char === '.' && hasExtraDecimal(display.value)) {  // Verifica se o ponto decimal já foi usado
    showError('Já existe ponto decimal'); return;
  }
  display.value += char;  // Adiciona o caractere ao valor do display
  updateParenCount();  // Atualiza o contador de parênteses
};

// Funções para deletar o último caractere ou limpar o display
window.deleteLast = () => { clearError(); display.value = display.value.slice(0, -1); updateParenCount(); };
window.clearDisplay = () => { display.value = ''; clearError(); updateParenCount(); };

// — Cálculo e exemplos —
// Funções para calcular o resultado e carregar exemplos
window.calculateResult = calculateResult;
window.loadExample     = loadExample;

// — Atalhos de teclado e paste —
// Adiciona um evento de teclado para permitir o uso de atalhos de teclado e validação
display.addEventListener('keydown', e => {
  const allowed = '0123456789+-*/().';  // Define os caracteres permitidos

  if (e.key === 'Enter') {  // Se a tecla pressionada for Enter, calcula o resultado
    e.preventDefault();  // Evita o comportamento padrão
    calculateResult();  // Chama a função de cálculo
  }
  else if (['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key)) {  // Se for uma tecla de navegação, limpa erro
    clearError();
  }
  else if (allowed.includes(e.key)) {  // Se for um caractere permitido
    clearError();  // Limpa o erro
    if (e.key === '.' && hasExtraDecimal(display.value)) {  // Se já houver um ponto decimal, exibe erro
      e.preventDefault();
      showError('Já existe ponto decimal');
    }
    else if (/[+\-*/.]/.test(display.value.slice(-1)) && /[+\-*/.]/.test(e.key)) {  // Se for operador após outro operador, exibe erro
      e.preventDefault();
      showError('Operador inválido');
    }
  } else {  // Se pressionar uma tecla inválida
    e.preventDefault();  // Bloqueia a tecla
    showError('Somente números e operadores');  // Exibe erro
  }
});

// — Colagem —
// Adiciona um evento para impedir colagens inválidas no display
display.addEventListener('paste', e => {
  const paste = (e.clipboardData || window.clipboardData).getData('text');  // Obtém o texto da área de transferência
  if (!/^[0-9+\-*/().\s]+$/.test(paste)) {  // Se o conteúdo copiado não for válido
    e.preventDefault();  // Impede a colagem
    showError('Conteúdo inválido');  // Exibe erro
  }
});
