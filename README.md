# Gestor Financeiro Pessoal

Sistema completo de gestão financeira pessoal com frontend Angular e Node.js.

## 📋 Visão Geral

Aplicação para controlar receitas e despesas pessoais, calculando saldo automaticamente e oferecendo recursos de filtragem por categoria e tipo.

---

## 🔙 Backend (Node.js + MongoDB)

### Conceitos

#### **server.js**
Ponto de entrada da aplicação backend:
- Configura o Express (framework web)
- Habilita CORS para comunicação com frontend
- Conecta ao MongoDB
- Define as rotas da API

#### **config/database.js**
Gerencia a conexão com o banco de dados:
- Conecta ao MongoDB usando Mongoose
- Usa variáveis de ambiente (.env) para segurança
- Trata erros de conexão

#### **models/Transacao.js**
Define a estrutura dos dados:
- Schema do Mongoose com validações
- Campos: descrição, valor, tipo (receita/despesa), categoria e data
- Categorias predefinidas para receitas e despesas

#### **routes/transacoes.js**
API RESTful com endpoints:
- **GET /api/transacoes** - Lista todas as transações (com filtros opcionais)
- **GET /api/transacoes/:id** - Busca transação específica
- **POST /api/transacoes** - Cria nova transação
- **PUT /api/transacoes/:id** - Atualiza transação
- **DELETE /api/transacoes/:id** - Remove transação
- **GET /api/transacoes/saldo/total** - Calcula saldo (receitas - despesas)

---

## 🎨 Frontend

### Conceitos

#### **app.module.ts**
Módulo principal que:
- Declara todos os componentes
- Importa módulos necessários (HttpClient, Forms, etc.)
- Define o componente de inicialização

#### **models/transacao.model.ts**
Define tipos TypeScript:
- Interface `Transacao` para tipagem forte
- Interface `Saldo` para dados financeiros
- Constantes de categorias

#### **services/transacao.service.ts**
Serviço para comunicação com backend:
- Métodos para todas as operações CRUD
- Usa HttpClient do Angular
- Retorna Observables (programação reativa)
- Constrói URLs e parâmetros de query

#### **services/notificacao.service.ts**
Gerencia mensagens ao usuário:
- Exibe notificações de sucesso/erro
- Sistema de fila de mensagens
- Auto-fechamento após alguns segundos

#### **components/transacao-form/**
Formulário para adicionar/editar transações:
- Two-way data binding com `[(ngModel)]`
- Valida campos antes de salvar
- Alterna categorias conforme tipo (receita/despesa)
- Modo criação e edição

#### **components/transacao-list/**
Lista e gerencia transações:
- Exibe todas as transações em tabela
- Filtros por tipo e categoria
- Botões de editar e excluir
- Formatação de datas e valores monetários
- Cores por categoria para melhor visualização
- Atualização automática a cada 3 segundos

#### **components/saldo/**
Exibe resumo financeiro:
- Total de receitas
- Total de despesas
- Saldo líquido (receitas - despesas)
- Cores condicionais (verde para positivo, vermelho para negativo)
- Atualização automática

#### **components/notificacao/**
Componente visual de notificações:
- Exibe mensagens temporárias
- Diferencia sucesso e erro por cor
- Animações de entrada/saída

---

## 🚀 Como Executar

### Backend
```bash
pnpm install
# Configure .env com MONGODB_URI
pnpm start
```

### Frontend
```bash
pnpm install
pnpm start
```

Acesse: http://localhost:4200

---