// Modelo de Transação (Necessário para tipagem forte no TypeScript)
export interface Transacao {
  _id?: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Saldo {
  receitas: number;
  despesas: number;
  saldo: number;
}

export const CATEGORIAS_RECEITA = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Outros Ganhos'
];

export const CATEGORIAS_DESPESA = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Contas',
  'Outros Gastos'
];
