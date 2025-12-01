import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao, Saldo } from '../models/transacao.model';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  // URL base da API
  private apiUrl = 'http://localhost:3000/api/transacoes';

  constructor(private http: HttpClient) { }

  // Listar todas as transações com filtros opcionais
  listarTransacoes(filtros?: {
    tipo?: string;
    categoria?: string;
    dataInicio?: string;
    dataFim?: string;
  }): Observable<Transacao[]> {
    let params = new HttpParams();

    if (filtros) {
      if (filtros.tipo) {
        params = params.set('tipo', filtros.tipo);
      }
      if (filtros.categoria) {
        params = params.set('categoria', filtros.categoria);
      }
      if (filtros.dataInicio) {
        params = params.set('dataInicio', filtros.dataInicio);
      }
      if (filtros.dataFim) {
        params = params.set('dataFim', filtros.dataFim);
      }
    }

    return this.http.get<Transacao[]>(this.apiUrl, { params });
  }

  // Buscar transação por ID
  buscarPorId(id: string): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.apiUrl}/${id}`);
  }

  // Criar nova transação
  criar(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }

  // Atualizar transação
  atualizar(id: string, transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.apiUrl}/${id}`, transacao);
  }

  // Excluir transação
  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obter saldo total
  obterSaldo(): Observable<Saldo> {
    return this.http.get<Saldo>(`${this.apiUrl}/saldo/total`);
  }
}