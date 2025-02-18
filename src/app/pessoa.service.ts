import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Pessoa {
  id?: number;
  nome: string;
  data_nasc: string;
  cpf: string;
  sexo: string;
  altura: number;
  peso: number;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private apiUrl = environment.apiUrl + '/pessoas/';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  incluir(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  pesquisar(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}${id}/`);
  }

  alterar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}${pessoa.id}/`, pessoa);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  calcularPesoIdeal(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/peso-ideal/`);
  }

  pesquisarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}${id}/`);
  }

  pesquisarPorCpf(cpf: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}cpf/${cpf}/`);
  }
}
