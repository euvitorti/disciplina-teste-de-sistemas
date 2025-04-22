// Importa funções para exibir ou limpar erros e funções de validação
import { showError, clearError } from './errorHandler.js';  
import {
  isEmpty,                // Verifica se a expressão está vazia
  hasInvalidChars,        // Verifica se a expressão contém caracteres inválidos
  isDivideByZero,         // Verifica se a expressão contém uma divisão por zero
  hasUnbalancedParens     // Verifica se os parênteses estão desequilibrados
} from './validation.js';

// Recupera o histórico de cálculos armazenado no localStorage ou inicializa um array vazio
let history = JSON.parse(localStorage.getItem('calcHistory') || '[]');
const historyList = document.getElementById('history-list');  // Elemento onde o histórico será exibido

// Função para calcular o resultado da expressão
export function calculateResult() {
  clearError();  // Limpa qualquer erro anterior
  const expr = display.value;  // Obtém a expressão da tela de exibição
  
  // Verificações de validação
  if (isEmpty(expr))            { showError('Digite algo'); return; }
  if (hasInvalidChars(expr))    { showError('Expressão inválida'); return; }
  if (isDivideByZero(expr))     { showError('Divisão por zero!'); return; }
  if (hasUnbalancedParens(expr)){ showError('Parênteses desequilibrados'); return; }

  try {
    // Tenta calcular o resultado da expressão
    const result = new Function('return ' + expr)();  // Usa a função `Function` para avaliar a expressão
    if (!isFinite(result)) throw new Error();  // Verifica se o resultado não é infinito
    display.value = result;  // Exibe o resultado na tela
    addToHistory(expr, result);  // Adiciona a expressão e o resultado ao histórico
  } catch {
    showError('Erro no cálculo');  // Exibe erro caso ocorra algum problema no cálculo
  }
}

// Função para adicionar uma expressão e seu resultado ao histórico
function addToHistory(expr, result) {
  history.unshift({ expr, result });  // Adiciona no início do histórico
  history = history.slice(0, 20);  // Limita o histórico a 20 registros
  localStorage.setItem('calcHistory', JSON.stringify(history));  // Armazena o histórico no localStorage
  renderHistory();  // Atualiza a lista de histórico exibida
}

// Função para renderizar o histórico de cálculos
export function renderHistory() {
  historyList.innerHTML = '';  // Limpa a lista de histórico
  history.forEach(({ expr, result }) => {  // Para cada item do histórico...
    const li = document.createElement('li');  // Cria um item de lista
    li.innerHTML = `<span>${expr} = ${result}</span>
                    <button title="Recarregar">↺</button>`;  // Adiciona a expressão e resultado no item de lista
    // Adiciona um evento de clique no botão de recarregar, que coloca a expressão de volta na tela
    li.querySelector('button').onclick = () => {
      display.value = expr;  // Coloca a expressão no display
      clearError();  // Limpa qualquer erro
      updateParenCount();  // Atualiza o contador de parênteses
    };
    historyList.append(li);  // Adiciona o item à lista de histórico
  });
}

// Função para carregar um exemplo de expressão no display
export function loadExample(expr) {
  clearError();  // Limpa qualquer erro
  display.value = expr;  // Coloca a expressão no display
  updateParenCount();  // Atualiza o contador de parênteses
}
