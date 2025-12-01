# Gestor Financeiro Pessoal - Backend

API REST para controle financeiro pessoal construída com Node.js, Express e MongoDB.

## 🚀 Tecnologias

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## ⚙️ Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Edite o arquivo `.env` com suas configurações:

```env
MONGODB_URI=mongodb://localhost:27017/gestorfinanceiro
PORT=3000
```

**Para MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/gestorfinanceiro
```

## 🎯 Executar o Projeto

### Modo de desenvolvimento (com nodemon):
```bash
npm run dev
```

### Modo de produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/transacoes` | Lista todas as transações |
| GET | `/api/transacoes/:id` | Busca uma transação por ID |
| POST | `/api/transacoes` | Cria uma nova transação |
| PUT | `/api/transacoes/:id` | Atualiza uma transação |
| DELETE | `/api/transacoes/:id` | Exclui uma transação |
| GET | `/api/transacoes/saldo/total` | Calcula o saldo total |

### Filtros disponíveis (GET /api/transacoes)

- `tipo`: receita ou despesa
- `categoria`: nome da categoria
- `dataInicio`: data inicial (YYYY-MM-DD)
- `dataFim`: data final (YYYY-MM-DD)

Exemplo: `/api/transacoes?tipo=receita&categoria=Salário`

### Estrutura de uma Transação

```json
{
  "descricao": "Salário Mensal",
  "valor": 5000,
  "tipo": "receita",
  "categoria": "Salário",
  "data": "2025-11-30"
}
```

### Categorias Disponíveis

**Receitas:**
- Salário
- Freelance
- Investimentos
- Outros Ganhos

**Despesas:**
- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Compras
- Contas
- Outros Gastos

## 🗂️ Estrutura do Projeto

```
backend/
├── config/
│   └── database.js      # Configuração do MongoDB
├── models/
│   └── Transacao.js     # Model Mongoose
├── routes/
│   └── transacoes.js    # Rotas da API
├── .env                 # Variáveis de ambiente
├── .env.example         # Exemplo de configuração
├── .gitignore
├── package.json
└── server.js            # Servidor principal
```

## 📝 Exemplos de Uso

### Criar uma receita:
```bash
POST http://localhost:3000/api/transacoes
Content-Type: application/json

{
  "descricao": "Salário Janeiro",
  "valor": 5000,
  "tipo": "receita",
  "categoria": "Salário",
  "data": "2025-01-01"
}
```

### Criar uma despesa:
```bash
POST http://localhost:3000/api/transacoes
Content-Type: application/json

{
  "descricao": "Supermercado",
  "valor": 250.50,
  "tipo": "despesa",
  "categoria": "Alimentação",
  "data": "2025-01-05"
}
```

### Consultar saldo:
```bash
GET http://localhost:3000/api/transacoes/saldo/total
```

Resposta:
```json
{
  "receitas": 5000,
  "despesas": 250.50,
  "saldo": 4749.50
}
```
