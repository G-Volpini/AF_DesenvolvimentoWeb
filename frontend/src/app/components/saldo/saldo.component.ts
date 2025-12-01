import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../../services/transacao.service';
import { Saldo } from '../../models/transacao.model';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {
  constructor(private transacaoService: TransacaoService) {}
  saldo: Saldo = {
    receitas: 0,
    despesas: 0,
    saldo: 0
  };


  ngOnInit() {
    this.carregarSaldo();
    
    // Atualizar saldo a cada 3 segundos (Evita reload manual, msm logica usada em outras partes, ambas deram certo ao enviar uma nova transação)
    // Analisando perfomance, não deve impactar tanto, visto que é uma requisição simples para obter o saldo atualizado
    setInterval(() => {
      this.carregarSaldo();
    }, 3000);
  }

  // Carrega o saldo atual do serviço (Envio a API)
  carregarSaldo() {
    this.transacaoService.obterSaldo().subscribe({
      next: (saldo) => {
        this.saldo = saldo;
      },
      error: (erro) => {
        console.error('Erro ao carregar saldo:', erro);
      }
    });
  }

  // Formata um valor numérico como moeda brasileira (R$)
  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
}
