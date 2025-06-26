import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FilmeListComponent } from './filmes/filme-list/filme-list.component';
import { AuthGuard } from './auth/auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // redireciona para login ao acessar raiz
    { path: 'login', component: LoginComponent },
    { path: 'filmes', component: FilmeListComponent, canActivate: [AuthGuard] },
    // Outras rotas (ex: compartilhamento, detalhes) aqui
    { path: '**', redirectTo: '/login' } // rota coringa (404)
];

@NgModule({
    imports: [RouterModule.forRoot(routes), MatDialogModule, MatIconModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }