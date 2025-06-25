import { Component } from '@angular/core';
import { FilmeService } from '../filme.service';
import { Filme, FilmeStatus } from '../filme.model';

@Component({
  selector: 'app-filme-list',
  imports: [],
  templateUrl: './filme-list.component.html',
  styleUrl: './filme-list.component.css'
})
export class FilmeListComponent {
  filmes: Filme[] = [];
  statusFilter: FilmeStatus | 'todos' = 'todos'; // Inicializa o filtro como 'todos'

  constructor(private filmeService: FilmeService) {
    this.loadFilmes();// Carrega os filmes ao inicializar o componente
  }

  // Carrega os filmes com base no filtro de status
  loadFilmes() {
    this.filmes = this.filmeService.getAll(this.statusFilter === 'todos' ? 'todos' : this.statusFilter); 
  }

  onStatusChange(status: FilmeStatus | 'todos'){
    this.statusFilter = status; // Atualiza o filtro de status
    this.loadFilmes(); // Recarrega os filmes com o novo filtro
  }

}
