import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TransacaoService } from '../../services/transacao.service';
import { NotificacaoService } from '../../services/notificacao.service';
import { Transacao, CATEGORIAS_RECEITA, CATEGORIAS_DESPESA } from '../../models/transacao.model';

@Component({
  selector: 'app-transacao-form',
  templateUrl: './transacao-form.component.html',
  styleUrls: ['./transacao-form.component.css']
})
export class TransacaoFormComponent implements OnInit, OnChanges {
  @Input() transacaoParaEditar: Transacao | null = null;
  @Output() transacaoSalva = new EventEmitter<void>();
  @Output() cancelarEdicao = new EventEmitter<void>();
  transacao: Transacao = {
    descricao: '',
    valor: 0,
    tipo: 'receita',
    categoria: '',
    data: new Date().toISOString().split('T')[0]
  };

  categorias: string[] = [];
  modoEdicao = false;

  constructor(
    private transacaoService: TransacaoService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit() {
    this.atualizarCategorias();
  }

  // Detecta mudanças na transação para editar e atualiza o formulário
  ngOnChanges(changes: SimpleChanges) {
    if (changes['transacaoParaEditar'] && this.transacaoParaEditar) {
      this.modoEdicao = true;
      this.transacao = {
        ...this.transacaoParaEditar,
        data: this.transacaoParaEditar.data instanceof Date 
          ? this.transacaoParaEditar.data.toISOString().split('T')[0]
          : this.transacaoParaEditar.data.toString().split('T')[0]
      };
      this.atualizarCategorias();
    }
  }

  // Atualiza as categorias disponíveis com base no tipo de transação selecionado (receita ou despesa)
  atualizarCategorias() {
    this.categorias = this.transacao.tipo === 'receita' 
      ? CATEGORIAS_RECEITA 
      : CATEGORIAS_DESPESA;
    
    if (this.categorias.length > 0 && !this.transacao.categoria) {
      this.transacao.categoria = this.categorias[0];
    }
  }

  // Manipulador de mudança de tipo de transação
  onTipoChange() {
    this.atualizarCategorias();
    this.transacao.categoria = this.categorias[0];
  }

  // Envio do formulário (salvar ou atualizar transação com todos os dados necessários)
  salvar() {
    if (!this.validarFormulario()) {
      return;
    }

    // Debuguar dados, verificar se estão corretos antes de enviar
    if (this.modoEdicao && this.transacao._id) {
      this.transacaoService.atualizar(this.transacao._id, this.transacao).subscribe({

        // Sucesso na atualização
        next: () => {
          this.notificacaoService.sucesso('Transação atualizada com sucesso!');
          this.limparFormulario();
          this.transacaoSalva.emit();
        },

        // Erro na atualização
        error: (erro) => {
          console.error('Erro ao atualizar transação:', erro);
          this.notificacaoService.erro('Erro ao atualizar transação');
        }
      });
    } else {
      this.transacaoService.criar(this.transacao).subscribe({
        next: () => {
          this.notificacaoService.sucesso('Transação cadastrada com sucesso!');
          this.limparFormulario();
          this.transacaoSalva.emit();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar transação:', erro);
          this.notificacaoService.erro('Erro ao cadastrar transação');
        }
      });
    }
  }

  // Cancela a edição da transação e limpa o formulário
  cancelar() {
    this.limparFormulario();
    this.cancelarEdicao.emit();
  }

  // Valida os campos do formulário antes de enviar (Valido para a notificação está parte, confirmar se não apresentará erros)
  validarFormulario(): boolean {
    if (!this.transacao.descricao.trim()) {
      this.notificacaoService.erro('Descrição é obrigatória');
      return false;
    }
    if (this.transacao.valor <= 0) {
      this.notificacaoService.erro('Valor deve ser maior que zero');
      return false;
    }
    if (!this.transacao.categoria) {
      this.notificacaoService.erro('Categoria é obrigatória');
      return false;
    }
    return true;
  }

  // Limpa o formulário e reseta o estado para adicionar nova transação
  limparFormulario() {
    this.transacao = {
      descricao: '',
      valor: 0,
      tipo: 'receita',
      categoria: CATEGORIAS_RECEITA[0],
      data: new Date().toISOString().split('T')[0]
    };
    this.modoEdicao = false;
    this.atualizarCategorias();
  }
}