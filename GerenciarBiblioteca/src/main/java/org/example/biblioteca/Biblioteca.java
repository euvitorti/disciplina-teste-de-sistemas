package org.example.biblioteca;

import org.example.Enum.StatusLivro;
import org.example.livro.Livro;

import java.util.ArrayList;
import java.util.List;

public class Biblioteca {

    private List<Livro> livros;

    public Biblioteca(){
        this.livros = new ArrayList<>();
    }

    // Adicionar um livro à biblioteca, recebendo o livro como param
    public void adicionarLivro(Livro livro){
        // Adicionar o livro na lista
        livros.add(livro);
    }

    public boolean emprestarLivro(int idLivro){

        for(Livro livro : livros){
            // Verificar se o id está presente na lista e verifica se o status está DISPONÍVEL
            if(livro.getId() == idLivro && livro.getStatusLivro() == StatusLivro.DISPONIVEL){
                // Atualiza o status para emprestado
                livro.setStatusLivro(StatusLivro.EMPRESTADO);
                return true;
            }
        }

        return false;
    }

    public boolean devolverLivro(int idLivro){

        for(Livro livro : livros){
            // Verificar se o id está presente na lista e verifica se o status está DISPONÍVEL
            if(livro.getId() == idLivro && livro.getStatusLivro() == StatusLivro.EMPRESTADO){
                // Atualiza o status para disponivel
                livro.setStatusLivro(StatusLivro.DISPONIVEL);
                return true;
            }
        }
        return false;
    }

    public List<Livro> listarLivroDisponiveis(){
        List<Livro> disponiveis = new ArrayList<>();

        for(Livro livro : livros){
            // Verifica se o livro está disponível
            if(livro.getStatusLivro() == StatusLivro.DISPONIVEL){
                // Adiciona o livro no lista
                disponiveis.add(livro);
            }
        }
        return disponiveis;
    }
}
