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

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public StatusLivro getStatusLivro() {
        return statusLivro;
    }

    public void setStatusLivro(StatusLivro statusLivro) {
        this.statusLivro = statusLivro;
    }

    @Override
    public String toString() {
        return "Livro{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", autor='" + autor + '\'' +
                ", statusLivro=" + statusLivro +
                '}';
    }
}
