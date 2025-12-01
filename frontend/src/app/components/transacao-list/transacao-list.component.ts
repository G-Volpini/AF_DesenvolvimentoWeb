import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TransacaoService } from '../../services/transacao.service';
import { NotificacaoService } from '../../services/notificacao.service';
import { Transacao, CATEGORIAS_RECEITA, CATEGORIAS_DESPESA } from '../../models/transacao.model';

@Component({
  selector: 'app-transacao-list',
  templateUrl: './transacao-list.component.html',
  styleUrls: ['./transacao-list.component.css']
})
export class TransacaoListComponent implements OnInit {
  @Output() editarTransacao = new EventEmitter<Transacao>();
  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  filtroTipo = '';
  filtroCategoria = '';
  todasCategorias: string[] = [];

  constructor(
    private transacaoService: TransacaoService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit() {
    this.carregarTransacoes();
    this.todasCategorias = [...CATEGORIAS_RECEITA, ...CATEGORIAS_DESPESA];
    
    // Atualiza a cada 3 segundos (Evita reload manual e tmb trouxe melhor visualização dos dados para saber oque upei)
    // Analisando perfomance, não deve impactar tanto, visto que é uma requisição simples para obter as transações atualizadas, 
    // talvez futuramente implementar WebSocket para atualizações em tempo real seja uma opção melhor.
    setInterval(() => {
      this.carregarTransacoes();
    }, 3000);
  }

  // Carrega as transações do serviço e aplica os filtros se solicitados
  carregarTransacoes() {
    this.transacaoService.listarTransacoes().subscribe({
      next: (transacoes) => {
        this.transacoes = transacoes;
        this.aplicarFiltros();
      },
      error: (erro) => {
        console.error('Erro ao carregar transações:', erro);
      }
    });
  }

  // Aplica os filtros selecionados às transações carregadas
  aplicarFiltros() {
    this.transacoesFiltradas = this.transacoes.filter(t => {
      const matchTipo = !this.filtroTipo || t.tipo === this.filtroTipo;
      const matchCategoria = !this.filtroCategoria || t.categoria === this.filtroCategoria;
      return matchTipo && matchCategoria;
    });
  }

  // Manipuladores de mudança de filtro
  onFiltroChange() {
    this.aplicarFiltros();
  }

  // Limpa os filtros aplicados (mostra todas as transações novamente)
  limparFiltros() {
    this.filtroTipo = '';
    this.filtroCategoria = '';
    this.aplicarFiltros();
  }

  // Emite o evento para editar uma transação
  editar(transacao: Transacao) {
    this.editarTransacao.emit(transacao);
  }

  // Exclui uma transação pelo ID
  excluir(id: string | undefined) {
    if (!id) return;
    
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transacaoService.excluir(id).subscribe({
        next: () => {
          this.notificacaoService.sucesso('Transação excluída com sucesso!');
          this.carregarTransacoes();
        },
        error: (erro) => {
          console.error('Erro ao excluir transação:', erro);
          this.notificacaoService.erro('Erro ao excluir transação');
        }
      });
    }
  }

  // Formata um valor numérico para nossa moeda (BRL)
  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  // Formata uma data para o formato brasileiro (pt-BR)
  formatarData(data: Date | string): string {
    const dataObj = typeof data === 'string' ? new Date(data) : data;
    return new Intl.DateTimeFormat('pt-BR').format(dataObj);
  }

  // Retorna uma cor específica para cada categoria de transação (usado para etiquetas coloridas, melhor organização)
  getCorCategoria(categoria: string): string {
    const cores: { [key: string]: string } = {
      'Salário': '#4CAF50',
      'Freelance': '#8BC34A',
      'Investimentos': '#009688',
      'Outros Ganhos': '#00BCD4',
      'Alimentação': '#FF5722',
      'Transporte': '#FF9800',
      'Moradia': '#F44336',
      'Saúde': '#E91E63',
      'Educação': '#9C27B0',
      'Lazer': '#673AB7',
      'Compras': '#3F51B5',
      'Contas': '#2196F3',
      'Outros Gastos': '#607D8B'
    };
    return cores[categoria] || '#999';
  }
}
