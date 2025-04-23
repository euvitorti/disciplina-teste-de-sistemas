/**
 * Arquivo de testes para a Calculadora
 * Implementa diferentes tipos de testes conforme o roteiro:
 * - Testes de Unidade
 * - Testes de Interface
 * - Testes de Validação
 * - Testes de Exceção
 */

// Define uma suíte de testes para a Calculadora Simples
describe("Calculadora Simples - Suíte de Testes", () => {
  // Hook beforeEach: Executa antes de cada teste para garantir um estado limpo
  // Isso é importante para que um teste não afete o resultado de outro
  beforeEach(() => {
    clearDisplay() // Limpa o display antes de cada teste
  })

  /**
   * TESTES DE UNIDADE
   * Objetivo: Verificar se funções específicas do código estão funcionando corretamente
   * Testamos cada operação matemática básica isoladamente
   */

  // Teste de soma: 4 + 5 deve resultar em 9
  it("Teste de Unidade: Soma de dois números", () => {
    addToDisplay("4") 
    addToDisplay("+") 
    addToDisplay("5") 
    calculateResult() /
    // Verifica se o resultado é o esperado
    expect(document.getElementById("display").value).toBe("9")
  })

  // Teste de subtração: 9 - 4 deve resultar em 5
  it("Teste de Unidade: Subtração de dois números", () => {
    addToDisplay("9") 
    addToDisplay("-") 
    addToDisplay("4") 
    calculateResult() 
    // Verifica se o resultado é o esperado
    expect(document.getElementById("display").value).toBe("5")
  })

  // Teste de multiplicação: 3 * 5 deve resultar em 15
  it("Teste de Unidade: Multiplicação de dois números", () => {
    addToDisplay("3") 
    addToDisplay("*")
    addToDisplay("5") 
    calculateResult() 
    // Verifica se o resultado é o esperado
    expect(document.getElementById("display").value).toBe("15")
  })

  // Teste de divisão: 10 / 2 deve resultar em 5
  it("Teste de Unidade: Divisão de dois números", () => {
    addToDisplay("10") 
    addToDisplay("/") 
    addToDisplay("2") 
    calculateResult() 
    // Verifica se o resultado é o esperado
    expect(document.getElementById("display").value).toBe("5")
  })

  /**
   * TESTE DE EXCEÇÃO
   * Objetivo: Verificar se o sistema lida com situações excepcionais corretamente
   * Testamos o caso especial de divisão por zero
   */
  it("Teste de Exceção: Divisão por zero", () => {
    addToDisplay("10") 
    addToDisplay("/") 
    addToDisplay("0") 
    calculateResult() 
    // Verifica se a mensagem de erro apropriada é exibida
    expect(document.getElementById("display").value).toBe("Erro: divisão por zero não é permitida.")
  })

  /**
   * TESTE DE INTERFACE (UI)
   * Objetivo: Verificar se os botões e campos da tela estão funcionando corretamente
   * Testamos se o botão de limpar (C) funciona como esperado
   */
  it("Teste de Interface: Botão de limpar (C) reseta o display", () => {
    addToDisplay("7") 
    clearDisplay() 
    // Verifica se o display está vazio após a limpeza
    expect(document.getElementById("display").value).toBe("")
  })

  /**
   * TESTE DE VALIDAÇÃO DE ENTRADA
   * Objetivo: Garantir que o sistema trata entradas inválidas de forma apropriada
   * Testamos o comportamento quando caracteres não numéricos são inseridos
   */
  it("Teste de Validação: Entrada de caracteres não numéricos", () => {
    addToDisplay("a") 
    addToDisplay("+")
    addToDisplay("b") 
    calculateResult() 
    // Verifica se a mensagem de erro apropriada é exibida
    expect(document.getElementById("display").value).toBe("Entrada inválida. Digite apenas números.")
  })
})

/**
 * Funções auxiliares para os testes
 * Estas funções simulam o comportamento da calculadora para os testes
 */

// Função para limpar o display
function clearDisplay() {
  document.getElementById("display").value = ""
}

// Função para adicionar valores ao display
function addToDisplay(value) {
  document.getElementById("display").value += value
}

// Função para calcular o resultado
function calculateResult() {
  try {
    const result = eval(document.getElementById("display").value)
    if (result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) {
      document.getElementById("display").value = "Erro: divisão por zero não é permitida."
    } else if (isNaN(result)) {
      document.getElementById("display").value = "Entrada inválida. Digite apenas números."
    } else {
      document.getElementById("display").value = result
    }
  } catch (error) {
    document.getElementById("display").value = "Entrada inválida. Digite apenas números."
  }
}
