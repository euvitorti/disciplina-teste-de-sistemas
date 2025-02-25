package org.example.livro;

import org.example.Enum.StatusLivro;

public class Livro {
    private int id;
    private String titulo;
    private String autor;
    private StatusLivro statusLivro;

    public Livro(int id, String titulo, String autor, StatusLivro statusLivro) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.statusLivro = statusLivro;
    }

    public int getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public StatusLivro getStatusLivro() {
        return statusLivro;
    }

    public void setStatusLivro(StatusLivro statusLivro) {
        this.statusLivro = statusLivro;
    }

    @Override
    public String toString() {
        return """
           ================================
           Livro:
             ID:      %d
             Título:  %s
             Autor:   %s
             Status:  %s
           ================================
           """.formatted(id, titulo, autor, statusLivro);
    }
}
