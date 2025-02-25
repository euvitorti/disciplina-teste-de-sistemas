package org.example.biblioteca;

import org.example.Enum.StatusLivro;
import org.example.livro.Livro;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Biblioteca {

    // Lista que armazena os livros da biblioteca.
    private List<Livro> livros = new ArrayList<>();

    // Adiciona um livro à biblioteca se o mesmo for válido (não nulo e com título/autor preenchidos).
    public boolean adicionarLivro(Livro livro) {
        if (livro == null || isEmpty(livro.getTitulo()) || isEmpty(livro.getAutor()))
            return false;
        return livros.add(livro);
    }

    // Método auxiliar para verificar se uma string é nula ou vazia.
    private boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }

    // Empresta um livro se ele estiver disponível.
    public boolean emprestarLivro(int idLivro) {
        for (Livro livro : livros) {
            if (livro.getId() == idLivro && livro.getStatusLivro() == StatusLivro.DISPONIVEL) {
                livro.setStatusLivro(StatusLivro.EMPRESTADO);
                return true;
            }
        }
        return false;
    }

    // Devolve um livro se ele estiver emprestado.
    public boolean devolverLivro(int idLivro) {
        for (Livro livro : livros) {
            if (livro.getId() == idLivro && livro.getStatusLivro() == StatusLivro.EMPRESTADO) {
                livro.setStatusLivro(StatusLivro.DISPONIVEL);
                return true;
            }
        }
        return false;
    }

    // Retorna uma lista de livros que estão disponíveis.
    public List<Livro> listarLivroDisponiveis() {
        return livros.stream()
                .filter(livro -> livro.getStatusLivro() == StatusLivro.DISPONIVEL)
                .collect(Collectors.toList());
    }
}
