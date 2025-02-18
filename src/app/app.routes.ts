import { Routes } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';

export const routes: Routes = [
  { path: 'pessoa', component: PessoaComponent },
  { path: '', redirectTo: 'pessoa', pathMatch: 'full' },
  { path: '**', redirectTo: 'pessoa' }
];
