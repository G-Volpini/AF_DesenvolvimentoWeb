const express = require('express');
const router = express.Router();
const Transacao = require('../models/Transacao');

// Listar todas as transações
router.get('/', async (req, res) => {
  try {
    const { tipo, categoria, dataInicio, dataFim } = req.query;
    
    let filtro = {};
    
    if (tipo) {
      filtro.tipo = tipo;
    }
    
    if (categoria) {
      filtro.categoria = categoria;
    }
    
    if (dataInicio || dataFim) {
      filtro.data = {};
      if (dataInicio) {
        filtro.data.$gte = new Date(dataInicio);
      }
      if (dataFim) {
        filtro.data.$lte = new Date(dataFim);
      }
    }
    
    const transacoes = await Transacao.find(filtro).sort({ data: -1 });
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar transações', 
      erro: error.message 
    });
  }
});

// Buscar transação por ID
router.get('/:id', async (req, res) => {
  try {
    const transacao = await Transacao.findById(req.params.id);
    
    if (!transacao) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' });
    }
    
    res.json(transacao);
  } catch (error) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar transação', 
      erro: error.message 
    });
  }
});

// Criar nova transação (Isso é um POST, ou seja, envia dados)
router.post('/', async (req, res) => {
  try {
    const transacao = new Transacao(req.body);
    const novaTransacao = await transacao.save();
    res.status(201).json(novaTransacao);
  } catch (error) {
    res.status(400).json({ 
      mensagem: 'Erro ao criar transação', 
      erro: error.message 
    });
  }
});

// Atualizar transações (Isso é um PUT, ele modifica dados)
router.put('/:id', async (req, res) => {
  try {
    const transacao = await Transacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!transacao) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' });
    }
    
    res.json(transacao);
  } catch (error) {
    res.status(400).json({ 
      mensagem: 'Erro ao atualizar transação', 
      erro: error.message 
    });
  }
});

// Excluir transação (Utilizando Id como localizador)
router.delete('/:id', async (req, res) => {
  try {
    const transacao = await Transacao.findByIdAndDelete(req.params.id);
    
    if (!transacao) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' });
    }
    
    res.json({ mensagem: 'Transação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ 
      mensagem: 'Erro ao excluir transação', 
      erro: error.message 
    });
  }
});

// Calcular saldo total
router.get('/saldo/total', async (req, res) => {
  try {
    const receitas = await Transacao.aggregate([
      { $match: { tipo: 'receita' } },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    
    const despesas = await Transacao.aggregate([
      { $match: { tipo: 'despesa' } },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    
    const totalReceitas = receitas.length > 0 ? receitas[0].total : 0;
    const totalDespesas = despesas.length > 0 ? despesas[0].total : 0;
    const saldo = totalReceitas - totalDespesas;
    
    res.json({
      receitas: totalReceitas,
      despesas: totalDespesas,
      saldo: saldo
    });
  } catch (error) {
    res.status(500).json({ 
      mensagem: 'Erro ao calcular saldo', 
      erro: error.message 
    });
  }
});

module.exports = router;
