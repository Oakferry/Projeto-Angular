import { Injectable } from '@angular/core';
import { Filme, FilmeStatus } from "./filme.model";

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private filmes: Filme[] = []; // Array para armazenar os filmes
  
  
  /**
   * Retorna todos os filmes, podendo filtrar por status.
   *
   * @param statusFilter - (Opcional) O status pelo qual filtrar os filmes.
   *                       Se não for informado ou for 'todos', retorna todos os filmes.
   * @returns Um array de filmes filtrados pelo status, se fornecido.
   */
  getAll(statusFilter?: FilmeStatus | 'todos'): Filme[]{ 
    if (statusFilter && statusFilter !== 'todos'){
      // Filtra os filmes pelo status informado
      return this.filmes.filter(f => f.status === statusFilter);
    }
    // Retorna todos os filmes caso não haja filtro ou o filtro seja 'todos'
    return this.filmes;
  }

  
  /**
   * Adiciona um novo filme à lista de filmes.
   *
   * @param filme - O objeto Filme a ser adicionado ao array de filmes.
   */
  add(filme: Filme): void{
    this.filmes.push(filme);
    this.salvarFilmesNoStorage(); // Salva os filmes no localStorage após adicionar
  }

  // Atualiza um filme existente na lista de filmes
  update(filme: Filme):void{
    const index = this.filmes.findIndex(f => f.id === filme.id);
    if(index !== -1) {
      this.filmes[index] = {...filme}; // Atualiza o filme no índice encontrado
      this.salvarFilmesNoStorage();
    }
  }

  // Remove um filme da lista de filmes
  delete(id: string): void{
    this.filmes = this.filmes.filter(f => f.id !== id); // Filtra os filmes, removendo o com o ID especificado
    this.salvarFilmesNoStorage(); // Salva os filmes no localStorage após remover
  }

  //Pega pelo id
  getById(id: string): Filme | undefined {
    return this.filmes.find(f => f.id === id); // Retorna o filme com o ID especificado ou undefined se não encontrado
  }


  /**
    * Busca filmes pelo termo no título (case insensitive).
    * @param termo - termo de busca
    * @returns Array de filmes que contêm o termo no título
    */
  search(termo: string): Filme[] {
    const lower = termo.toLowerCase();
    return this.filmes.filter(filme => filme.titulo.toLowerCase().includes(lower));
  }

  private salvarFilmesNoStorage() {
    localStorage.setItem('filmes', JSON.stringify(this.filmes));
  }// Carrega os filmes do localStorage ao iniciar o serviço

  constructor() { 
    const dados = localStorage.getItem('filmes');// Tenta obter os filmes do localStorage
    this.filmes = dados ? JSON.parse(dados) : [];// Se houver dados, converte de JSON para objeto; caso contrário, inicializa como array vazio
  }
}
