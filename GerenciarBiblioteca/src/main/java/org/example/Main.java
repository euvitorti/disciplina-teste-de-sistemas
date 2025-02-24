package org.example;

import org.example.Enum.StatusLivro;
import org.example.biblioteca.Biblioteca;
import org.example.livro.Livro;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Biblioteca biblioteca = new Biblioteca();

        while(true){
            System.out.println("""
                    Sistema de Gerenciamento de Biblioteca
                    1 - Adicionar Livro
                    2 - Emprestar Livro
                    3 - Devolver Livro
                    4 - Listar Livros
                    5 - Sair
                    """);

            int opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao){
                case 1:
                    adicionarLivro(biblioteca, scanner);
                    break;
                case 2:
                    emprestarLivro(biblioteca, scanner);
                    break;
                case 3:
                    devolverLivro(biblioteca, scanner);
                    break;
                case 4:
                    listarLivro(biblioteca);
                    break;
                case 5:
                    System.out.println("Saindo...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Opção inválida.");
                    break;
            }
        }
    }

    private static void listarLivro(Biblioteca biblioteca) {
        List<Livro> disponiveis = biblioteca.listarLivroDisponiveis();

        if(disponiveis.isEmpty()){
            System.out.println("Nenhum livro disponível no momento");
        } else{
            System.out.println("Livros disponíveis: ");
            for(Livro livro : disponiveis){
                System.out.println(livro);
            }
        }
    }

    private static void devolverLivro(Biblioteca biblioteca, Scanner scanner) {
        System.out.println("Digite o id: ");
        int id = scanner.nextInt();

        if(biblioteca.devolverLivro(id)){
            // se for verdadeiro mostra a mensagem que o livro foi emprestado
            System.out.println("Livro devolvido com sucesso.");
        } else{
            // mostra a mensagem caso o livro não esteja salvo ou já está disponível
            System.out.println("Livro não encontrado ou já disponível");
        }
    }

    private static void emprestarLivro(Biblioteca biblioteca, Scanner scanner) {

        System.out.println("Digite o id: ");
        int id = scanner.nextInt();

        if(biblioteca.emprestarLivro(id)){
            // se for verdadeiro mostra a mensagem que o livro foi emprestado
            System.out.println("Livro emprestado com sucesso.");
        } else{
            // mostra a mensagem caso o livro não esteja salvo ou já está emprestado
            System.out.println("Livro não encontrado ou já emprestado");
        }
    }

    private static void adicionarLivro(Biblioteca biblioteca, Scanner scanner) {
        // Ler os inputs
        System.out.println("Digite o id: ");
        int id = scanner.nextInt();
        scanner.nextLine();

        System.out.println("Digite o título: ");
        String titulo = scanner.nextLine();

        System.out.println("Digite o autor: ");
        String autor = scanner.nextLine();

        Livro livro = new Livro(id, titulo, autor, StatusLivro.DISPONIVEL);
        biblioteca.adicionarLivro(livro);
        System.out.println("Adicionado com sucesso");
    }
}