import { Component } from '@angular/core';
import { FilmeService } from '../filme.service';
import { Filme, FilmeStatus } from '../filme.model';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FilmeDetalheComponent } from '../filme-detalhe/filme-detalhe.component';


@Component({
  selector: 'app-filme-list',
  templateUrl: './filme-list.component.html',
  styleUrl: './filme-list.component.css',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatIconModule, MatButtonModule,
    MatFormField, MatSelectModule, FormsModule, MatInputModule
  ]
})
export class FilmeListComponent {
  filmes: Filme[] = [];
  statusFilter: FilmeStatus | 'todos' = 'todos';

  mostrarFormulario = false; // Variável para controlar a exibição do formulário
  editando: boolean = false;// Variável para controlar se está editando um filme
  filmeEditandoId: string | null = null; // Variável para armazenar o ID do filme que está sendo editado
  busca: string = ''; // Variável para armazenar o termo de busca

  novoFilme: {
    titulo: string;
    descricao: string;
    status: FilmeStatus | '';
    imagem: string;
  } = {
      titulo: '',
      descricao: '',
      status: '',
      imagem: ''
    };

  constructor(
    private filmeService: FilmeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loadFilmes();
  }


  loadFilmes() {
    this.filmes = this.filmeService.getAll(
      this.statusFilter === 'todos' ? 'todos' : this.statusFilter
    );
  }

  onStatusChange(status: FilmeStatus | 'todos') {
    this.statusFilter = status;
    this.loadFilmes();
  }


  removerFilme(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.filmeService.delete(id);
        this.loadFilmes();
        Swal.fire('Removido!', 'O filme foi removido com sucesso.', 'success');
      }
    });
  }


  editarFilme(filme: Filme) {
    this.editando = true;
    this.filmeEditandoId = filme.id;
    this.novoFilme = {
      titulo: filme.titulo,
      descricao: filme.descricao,
      status: filme.status,
      imagem: filme.imagem || ''
    };
    this.mostrarFormulario = true;
  }

  cancelarFormulario() {
    this.novoFilme = { titulo: '', descricao: '', status: '', imagem: '' };
    this.editando = false;
    this.filmeEditandoId = null;
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    // Se já estiver editando e clicar em adicionar, reseta estado
    if (this.mostrarFormulario) {
      this.cancelarFormulario();
    } else {
      this.mostrarFormulario = true;
    }
  }

  adicionarFilme() {
    if (!this.novoFilme.titulo || !this.novoFilme.descricao || !this.novoFilme.status) {
      Swal.fire('Erro', 'Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    if (this.editando && this.filmeEditandoId) {
      this.filmeService.update({
        id: this.filmeEditandoId,
        titulo: this.novoFilme.titulo,
        descricao: this.novoFilme.descricao,
        status: this.novoFilme.status as FilmeStatus,
        imagem: this.novoFilme.imagem
      });
      Swal.fire('Sucesso', 'Filme editado com sucesso!', 'success');
    } else {
      const novo: Filme = {
        id: Date.now().toString(),
        titulo: this.novoFilme.titulo,
        descricao: this.novoFilme.descricao,
        status: this.novoFilme.status as FilmeStatus,
        imagem: this.novoFilme.imagem
      };
      this.filmeService.add(novo);
      Swal.fire('Sucesso', 'Filme adicionado com sucesso!', 'success');
    }

    this.novoFilme = { titulo: '', descricao: '', status: '', imagem: '' };
    this.editando = false;
    this.filmeEditandoId = null;
    this.mostrarFormulario = false;
    this.loadFilmes();
  }

  onImagemSelecionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.novoFilme.imagem = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  logout() {
    this.authService.logout();
  }

  get filmesFiltrados() {
    const termo = this.busca.toLowerCase().trim();
    let lista = this.filmes;

    // Mantém o filtro de status que você já tem
    if (this.statusFilter && this.statusFilter !== 'todos') {
      lista = lista.filter(filme => filme.status === this.statusFilter);
    }

    // Filtro de busca
    if (!termo) return lista;

    return lista.filter(filme =>
      filme.titulo.toLowerCase().includes(termo) ||
      filme.descricao.toLowerCase().includes(termo)
    );
  }

  /*  onFileSelected(event: Event) {
     const input = event.target as HTMLInputElement;
     if (!input.files?.length) return;
     const file = input.files[0];
     const reader = new FileReader();
     reader.onload = () => this.novoFilme.imagem = reader.result as string;
     reader.readAsDataURL(file);
   } */

  abrirDetalhe(filme: any) {
    console.log('CLIQUE NO CARD', filme);
    const dialogRef = this.dialog.open(FilmeDetalheComponent, {
      width: '520px',
      data: { ...filme }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (result.acao === 'editar') {
        this.editarFilme(result.filme);
      } else if (result.acao === 'remover') {
        this.removerFilme(result.filme.id);
      }
      // salve a avaliação se quiser aqui
    });
  }
}