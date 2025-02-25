package org.example;

import org.example.Enum.StatusLivro;
import org.example.biblioteca.Biblioteca;
import org.example.livro.Livro;

import java.util.List;
import java.util.Scanner;

public class Main {

    // Scanner e Biblioteca declarados como variáveis estáticas
    private static final Scanner scanner = new Scanner(System.in);
    private static final Biblioteca biblioteca = new Biblioteca();

    public static void main(String[] args) {
        while (true) {
            System.out.println("""
                    Sistema de Gerenciamento de Biblioteca
                    1 - Adicionar Livro
                    2 - Emprestar Livro
                    3 - Devolver Livro
                    4 - Listar Livros
                    5 - Sair
                    """);

            int opcao = scanner.nextInt();
            scanner.nextLine(); // consome o \n

            switch (opcao) {
                case 1 -> adicionarLivro();
                case 2 -> emprestarLivro();
                case 3 -> devolverLivro();
                case 4 -> listarLivros();
                case 5 -> {
                    System.out.println("Saindo...");
                    scanner.close();
                    return;
                }
                default -> System.out.println("Opção inválida.");
            }
        }
    }

    private static void adicionarLivro() {
        System.out.print("Digite o id: ");
        int id = scanner.nextInt();
        scanner.nextLine(); // consome o \n

        System.out.print("Digite o título: ");
        String titulo = scanner.nextLine();

        System.out.print("Digite o autor: ");
        String autor = scanner.nextLine();

        Livro livro = new Livro(id, titulo, autor, StatusLivro.DISPONIVEL);
        if (biblioteca.adicionarLivro(livro)) {
            System.out.println("Livro adicionado com sucesso.");
        } else {
            System.out.println("Livro não salvo. Verifique os dados informados.");
        }
    }

    private static void emprestarLivro() {
        System.out.print("Digite o id do livro a ser emprestado: ");
        int id = scanner.nextInt();
        if (biblioteca.emprestarLivro(id)) {
            System.out.println("Livro emprestado com sucesso.");
        } else {
            System.out.println("Livro não encontrado ou já emprestado.");
        }
    }

    private static void devolverLivro() {
        System.out.print("Digite o id do livro a ser devolvido: ");
        int id = scanner.nextInt();
        if (biblioteca.devolverLivro(id)) {
            System.out.println("Livro devolvido com sucesso.");
        } else {
            System.out.println("Livro não encontrado ou já disponível.");
        }
    }

    private static void listarLivros() {
        List<Livro> disponiveis = biblioteca.listarLivroDisponiveis();
        if (disponiveis.isEmpty()) {
            System.out.println("Nenhum livro disponível no momento.");
        } else {
            System.out.println("Livros disponíveis:");
            disponiveis.forEach(System.out::println);
        }
    }
}
