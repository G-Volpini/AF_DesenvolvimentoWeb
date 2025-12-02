# Gestor Financeiro Pessoal

Sistema completo de gestão financeira pessoal com frontend Angular e Node.js.

---

## Backend (Node.js + MongoDB)

### Conceitos

#### **server.js**
Ponto de entrada da aplicação backend:
- Configura o Express (framework web)
- Habilita CORS para comunicação com frontend
- Conecta ao MongoDB
- Define as rotas da API

---

## 🎨 Frontend

### Conceitos

#### **app.module.ts**
Módulo principal que:
- Declara todos os componentes
- Importa módulos necessários (HttpClient, Forms, etc.)
- Define o componente de inicialização

---

## Como Executar

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
