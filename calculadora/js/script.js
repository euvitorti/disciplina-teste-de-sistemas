let currentInput = ""
let isResultDisplayed = false // Novo controle de estado

// Função para adicionar valores ao display
function addToDisplay(value) {
  // Se um resultado foi exibido e o usuário digitar um número ou operador, começamos do zero
  if (isResultDisplayed) {
    clearDisplay() // Limpa tudo antes de continuar
    isResultDisplayed = false
  }

  currentInput += value
  document.getElementById("display").value = currentInput

}

// Função para limpar o display
function clearDisplay() {
  currentInput = ""
  document.getElementById("display").value = ""
  isResultDisplayed = false // Reset também a flag

}

// Função para calcular o resultado
function calculateResult() {
  try {
    const result = eval(currentInput) // Avalia a expressão

    // Checa se o resultado é infinito ou inválido
    if (result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) {
      document.getElementById("display").value = "Erro: divisão por zero não é permitida."
      currentInput = ""
    } else if (isNaN(result)) {
      document.getElementById("display").value = "Entrada inválida. Digite apenas números."
      currentInput = ""
    } else {
      currentInput = result.toString() // Salva o resultado, mas ele pode ser substituído se o usuário digitar algo novo
      document.getElementById("display").value = currentInput
      isResultDisplayed = true // Ativa a flag de que um resultado foi exibido
    }
  } catch (error) {
    document.getElementById("display").value = "Entrada inválida. Digite apenas números."
    currentInput = ""
  }

}

// Função para sincronizar o valor do display com a variável currentInput
function syncDisplayWithInput() {
  currentInput = document.getElementById("display").value
}

document.addEventListener("DOMContentLoaded", () => {

  // Adiciona event listener para o campo de display
  const displayInput = document.getElementById("display")

  // Sincroniza o valor do display com a variável currentInput quando o usuário digita
  displayInput.addEventListener("input", syncDisplayWithInput)

  // Adiciona event listener para a tecla Enter para calcular o resultado
  displayInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault() // Previne o comportamento padrão do Enter
      calculateResult()
    }
  })
})
