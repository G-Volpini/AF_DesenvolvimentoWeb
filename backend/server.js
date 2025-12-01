require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const transacoesRoutes = require('./routes/transacoes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
connectDB();

// Express para iniciar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rotas da API
app.use('/api/transacoes', transacoesRoutes);

// Tratamento de erro 404 (Isso acontece se a API não roda direito)
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// Iniciar servidor (Adicionado para visualização)
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Acesse: http://localhost:${PORT}`);
});
