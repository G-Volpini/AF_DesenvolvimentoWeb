import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notificacao {
  id: number;
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'info';
}

@Injectable({
  providedIn: 'root'
})

/* 
 * Função de Notificações
 * Cada tipo de notificação (sucesso, erro, info) pode ser disparada, com uma mensagem específica.
 * As notificações são gerenciadas através de um Subject do RxJS, permitindo que componentes se inscrevam para receber atualizações.
 * Métodos disponíveis:
 * - sucesso: Exibe uma notificação de sucesso.
 * - erro: Exibe uma notificação de erro.
 * - info: Exibe uma notificação informativa.
*/

export class NotificacaoService {
  private notificacaoSource = new Subject<Notificacao>();
  private idCounter = 0;

  notificacao$ = this.notificacaoSource.asObservable();

  mostrar(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info') {
    const notificacao: Notificacao = {
      id: ++this.idCounter,
      mensagem,
      tipo
    };
    this.notificacaoSource.next(notificacao);
  }

  sucesso(mensagem: string) {
    this.mostrar(mensagem, 'sucesso');
  }

  erro(mensagem: string) {
    this.mostrar(mensagem, 'erro');
  }

  info(mensagem: string) {
    this.mostrar(mensagem, 'info');
  }
}
