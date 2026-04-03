const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let transactions = [
  { id: uuidv4(), desc: 'Salário', type: 'receita', category: 'Salário', amount: 5000, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Freela design', type: 'receita', category: 'Freelance', amount: 1200, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Aluguel', type: 'despesa', category: 'Moradia', amount: 1500, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Supermercado', type: 'despesa', category: 'Alimentação', amount: 800, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Uber/99', type: 'despesa', category: 'Transporte', amount: 300, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Netflix + Spotify', type: 'despesa', category: 'Assinaturas', amount: 85, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Academia', type: 'despesa', category: 'Saúde', amount: 120, month: 3, year: 2024 },
  { id: uuidv4(), desc: 'Curso online', type: 'despesa', category: 'Educação', amount: 197, month: 3, year: 2024 },
];

app.get('/api/transactions', (req, res) => {
  const { month, year } = req.query;
  let filtered = [...transactions];
  if (month !== undefined) filtered = filtered.filter(t => t.month === parseInt(month));
  if (year !== undefined) filtered = filtered.filter(t => t.year === parseInt(year));
  res.json(filtered);
});

app.post('/api/transactions', (req, res) => {
  const { desc, type, category, amount, month, year } = req.body;
  if (!desc || !type || !category || !amount) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  const tx = { id: uuidv4(), desc, type, category, amount: parseFloat(amount), month, year };
  transactions.push(tx);
  res.status(201).json(tx);
});

app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const before = transactions.length;
  transactions = transactions.filter(t => t.id !== id);
  if (transactions.length === before) return res.status(404).json({ error: 'Não encontrado.' });
  res.json({ success: true });
});

app.put('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const idx = transactions.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado.' });
  transactions[idx] = { ...transactions[idx], ...req.body };
  res.json(transactions[idx]);
});

app.get('/api/summary', (req, res) => {
  const { month, year } = req.query;
  let filtered = [...transactions];
  if (month !== undefined) filtered = filtered.filter(t => t.month === parseInt(month));
  if (year !== undefined) filtered = filtered.filter(t => t.year === parseInt(year));

  const receitas = filtered.filter(t => t.type === 'receita').reduce((s, t) => s + t.amount, 0);
  const despesas = filtered.filter(t => t.type === 'despesa').reduce((s, t) => s + t.amount, 0);

  const byCategory = {};
  filtered.forEach(t => {
    if (!byCategory[t.category]) byCategory[t.category] = { receita: 0, despesa: 0 };
    byCategory[t.category][t.type] += t.amount;
  });

  res.json({ receitas, despesas, saldo: receitas - despesas, byCategory });
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em http://localhost:${PORT}\n`);
});
