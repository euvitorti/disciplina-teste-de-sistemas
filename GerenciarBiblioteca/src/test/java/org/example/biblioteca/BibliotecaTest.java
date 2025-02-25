package org.example.biblioteca;

import org.example.Enum.StatusLivro;
import org.example.livro.Livro;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BibliotecaTest {

    @Test
    void deveAdicionarLivroQuandoDadosValidos() {
        Biblioteca biblioteca = new Biblioteca();
        Livro livro = new Livro(1, "A Bela e a Fera", "Priscila", StatusLivro.DISPONIVEL);
        assertTrue(biblioteca.adicionarLivro(livro));
    }

    @Test
    void naoDeveAdicionarLivroQuandoDadosIncompletos() {
        Biblioteca biblioteca = new Biblioteca();
        Livro livro = new Livro(1, "", "Priscila", StatusLivro.DISPONIVEL);
        assertFalse(biblioteca.adicionarLivro(livro));
    }

    @Test
    void naoDeveEmprestarLivroQuandoIndisponivel() {
        Biblioteca biblioteca = new Biblioteca();
        Livro livro = new Livro(1, "Título", "Autor", StatusLivro.EMPRESTADO);
        biblioteca.adicionarLivro(livro);
        assertFalse(biblioteca.emprestarLivro(1));
    }

    @Test
    void naoDeveEmprestarLivroQuandoIdInexistente() {
        Biblioteca biblioteca = new Biblioteca();
        assertFalse(biblioteca.emprestarLivro(1));
    }

    @Test
    void deveDevolverLivroEmprestado() {
        Biblioteca biblioteca = new Biblioteca();
        Livro livro = new Livro(1, "Título", "Autor", StatusLivro.EMPRESTADO);
        biblioteca.adicionarLivro(livro);
        assertTrue(biblioteca.devolverLivro(1));
    }

    @Test
    void naoDeveDevolverLivroQuandoJaDisponivel() {
        Biblioteca biblioteca = new Biblioteca();
        Livro livro = new Livro(1, "Título", "Autor", StatusLivro.DISPONIVEL);
        biblioteca.adicionarLivro(livro);
        assertFalse(biblioteca.devolverLivro(1));
    }

    @Test
    void naoDeveDevolverLivroQuandoInexistente() {
        Biblioteca biblioteca = new Biblioteca();
        assertFalse(biblioteca.devolverLivro(1));
    }

    @Test
    void deveListarLivrosDisponiveis() {
        Biblioteca biblioteca = new Biblioteca();
        Livro livro = new Livro(1, "Título", "Autor", StatusLivro.DISPONIVEL);
        biblioteca.adicionarLivro(livro);
        List<Livro> disponiveis = biblioteca.listarLivroDisponiveis();
        assertFalse(disponiveis.isEmpty());
    }

    @Test
    void deveRetornarListaVaziaQuandoNaoHaLivrosDisponiveis() {
        Biblioteca biblioteca = new Biblioteca();
        List<Livro> disponiveis = biblioteca.listarLivroDisponiveis();
        assertTrue(disponiveis.isEmpty());
    }
}
