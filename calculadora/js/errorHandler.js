// Obtém os elementos do DOM para manipulação
const display = document.getElementById('display');  // O display da calculadora, onde a mensagem de erro será exibida
const errorMessage = document.getElementById('error-message');  // O elemento onde a mensagem de erro será exibida

// Função para mostrar um erro
export function showError(msg) {
  display.classList.add('error');  // Adiciona a classe 'error' ao display, provavelmente alterando seu estilo visual para destacar o erro
  errorMessage.textContent = msg;  // Exibe a mensagem de erro no elemento de erro
  setTimeout(clearError, 1500);  // Após 1.5 segundos, chama a função clearError para limpar o erro
}

// Função para limpar o erro
export function clearError() {
  display.classList.remove('error');  // Remove a classe 'error' do display, restaurando seu estilo normal
  errorMessage.textContent = '';  // Limpa o conteúdo da mensagem de erro
}
