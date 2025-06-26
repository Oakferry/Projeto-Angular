import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-filme-detalhe',
  templateUrl: './filme-detalhe.component.html',
  styleUrls: ['./filme-detalhe.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule]
})
export class FilmeDetalheComponent {
  avaliacao: number = 0;

  constructor(
    public dialogRef: MatDialogRef<FilmeDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.avaliacao = data.avaliacao || 0;
  }

  setAvaliacao(nota: number) {
    this.avaliacao = nota;
    this.data.avaliacao = nota;
    // Aqui você pode salvar a avaliação no back-end ou localStorage se quiser
  }

  editar() {
    this.dialogRef.close({ acao: 'editar', filme: this.data });
  }

  remover() {
    this.dialogRef.close({ acao: 'remover', filme: this.data });
  }

  fechar() {
    this.dialogRef.close();
  }
}