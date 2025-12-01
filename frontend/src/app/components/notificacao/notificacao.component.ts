import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificacaoService, Notificacao } from '../../services/notificacao.service';

@Component({
    selector: 'app-notificacao',
    templateUrl: './notificacao.component.html',
    styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit, OnDestroy {
    notificacoes: Notificacao[] = [];
    private subscription: Subscription = new Subscription();

    constructor(private notificacaoService: NotificacaoService) { }

    // Inicializar o componente (Recebe e registra a notificação)
    ngOnInit() {
        this.subscription.add(
            this.notificacaoService.notificacao$.subscribe(notificacao => {
                this.notificacoes.push(notificacao);

                // Remover automaticamente após 4 segundos (Sem necessidade de clique do usuário, muito mais prático)
                setTimeout(() => {
                    this.remover(notificacao.id);
                }, 4000);
            })
        );
    }

    // Limpar a inscrição ao destruir o componente
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Remove uma notificação pelo ID
    remover(id: number) {
        this.notificacoes = this.notificacoes.filter(n => n.id !== id);
    }
}
