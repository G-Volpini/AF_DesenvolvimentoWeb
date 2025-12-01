const mongoose = require('mongoose');

const transacaoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  valor: {
    type: Number,
    required: [true, 'Valor é obrigatório']
  },
  tipo: {
    type: String,
    enum: ['receita', 'despesa'],
    required: [true, 'Tipo é obrigatório']
  },
  categoria: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: [
      'Salário',
      'Freelance',
      'Investimentos',
      'Outros Ganhos',
      'Alimentação',
      'Transporte',
      'Moradia',
      'Saúde',
      'Educação',
      'Lazer',
      'Compras',
      'Contas',
      'Outros Gastos'
    ]
  },
  data: {
    type: Date,
    required: [true, 'Data é obrigatória'],
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transacao', transacaoSchema);
