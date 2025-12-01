import { Component, OnInit } from '@angular/core';
import { Transacao } from './models/transacao.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  transacaoSelecionada: Transacao | null = null;
  constructor() {}
  ngOnInit() {}

  // Após salvar ou editar uma transação, limpar a seleção
  onTransacaoSalva() {
    this.transacaoSelecionada = null;
  }

  // Selecionar uma transação para edição
  onEditarTransacao(transacao: Transacao) {
    this.transacaoSelecionada = transacao;
  }

  // Cancelar edição
  onCancelarEdicao() {
    this.transacaoSelecionada = null;
  }
}
