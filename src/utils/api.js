import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const getTransactions = (month, year) =>
  api.get('/transactions', { params: { month, year } }).then(r => r.data);

export const createTransaction = (data) =>
  api.post('/transactions', data).then(r => r.data);

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`).then(r => r.data);

export const updateTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data).then(r => r.data);

export const getSummary = (month, year) =>
  api.get('/summary', { params: { month, year } }).then(r => r.data);
