export const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const CATEGORIAS_PADRAO = {
 receita: [
    { name: 'Salário', icon: '💼', color: '#2dd4a0' },
    { name: 'Outros', icon: '💰', color: '#94a3b8' },
  ],
  despesa: [
    { name: 'Moradia', icon: '🏠', color: '#f06060' },
    { name: 'Alimentação', icon: '🍽️', color: '#f97316' },
    { name: 'Transporte', icon: '🚗', color: '#fbbf24' },
    { name: 'Outros', icon: '📦', color: '#94a3b8' },
  ],
}

export const getCategoryMeta = (name, categories) => {
  const all = [
    ...(categories?.receita || []),
    ...(categories?.despesa || []),
  ];
  return all.find(c => c.name === name) || { icon: '💰', color: '#94a3b8' };
};

export const fmt = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);