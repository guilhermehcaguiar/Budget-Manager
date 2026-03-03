import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('DESPESA');
  const buscarDados = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/transacoes');
      setTransacoes(res.data);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  };
  const salvarTransacao = async (e) => {
    e.preventDefault();
    const nova = {
      descricao,
      valor: parseFloat(valor),
      categoria,
      tipo,
      fixo: categoria.toLowerCase() === 'salário',
      data: new Date().toISOString().split('T')[0]
    };
    await axios.post('http://localhost:8080/api/transacoes', nova);
    setDescricao(''); setValor(''); setCategoria('');
    buscarDados();
  };
  useEffect(() => { buscarDados(); }, []);
  const receitas = transacoes.filter(t => t.tipo === 'RECEITA').reduce((acc, t) => acc + t.valor, 0);
  const despesas = transacoes.filter(t => t.tipo === 'DESPESA').reduce((acc, t) => acc + t.valor, 0);
  const categoriasUnicas = [...new Set(transacoes.filter(t => t.tipo === 'DESPESA').map(t => t.categoria))];
  const dadosGrafico = {
    labels: categoriasUnicas,
    datasets: [{
      data: categoriasUnicas.map(cat => transacoes.filter(t => t.categoria === cat).reduce((acc, t) => acc + t.valor, 0)),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };
  return (
    <div style={{...styles.container, color: '#333'}}>
      <h1>📊 Dashboard Financeiro</h1>
      {/* Cards de Resumo */}
      <div style={styles.row}>
        <div style={{...styles.card, borderTop: '5px solid #2ecc71', color: '#333'}}>
          <small>Receitas</small>
          <h2>R$ {receitas.toFixed(2)}</h2>
        </div>
        <div style={{...styles.card, borderTop: '5px solid #e74c3c', color: '#333'}}>
          <small>Despesas</small>
          <h2>R$ {despesas.toFixed(2)}</h2>
        </div>
        <div style={{...styles.card, borderTop: '5px solid #3498db', color: '#333'}}>
          <small>Saldo Disponível</small>
          <h2>R$ {(receitas - despesas).toFixed(2)}</h2>
        </div>
      </div>
      <div style={styles.mainGrid}>
        {/* Formulário */}
        <div style={styles.card}>
          <h3>Nova Transação</h3>
          <form onSubmit={salvarTransacao} style={styles.form}>
            <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} style={styles.input} required />
            <input placeholder="Valor" type="number" value={valor} onChange={e => setValor(e.target.value)} style={styles.input} required />
            <input placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} style={styles.input} required />
            <select value={tipo} onChange={e => setTipo(e.target.value)} style={styles.input}>
              <option value="DESPESA">Despesa</option>
              <option value="RECEITA">Receita</option>
            </select>
            <button type="submit" style={styles.button}>Salvar</button>
          </form>
        </div>
        {/* Gráfico */}
        <div style={styles.card}>
          <h3>Gastos por Categoria</h3>
          <div style={{maxWidth: '250px', margin: 'auto'}}>
            <Pie data={dadosGrafico} />
          </div>
        </div>
      </div>
      {/* Tabela */}
      <div style={{...styles.card, marginTop: '20px'}}>
        <h3>Histórico</h3>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t.id} style={{borderBottom: '1px solid #eee', height: '40px'}}>
                <td>{t.descricao} {t.fixo && '📌'}</td>
                <td>{t.categoria}</td>
                <td style={{color: t.tipo === 'RECEITA' ? '#2ecc71' : '#e74c3c', fontWeight: 'bold'}}>
                  {t.tipo === 'RECEITA' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const styles = {
  container: { 
    padding: '20px 40px', 
    backgroundColor: '#f0f2f5', 
    minHeight: '100vh', 
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    boxSizing: 'border-box'
  },
  row: { 
    display: 'flex', 
    gap: '20px', 
    marginBottom: '30px',
    justifyContent: 'space-between',
    flexWrap: 'wrap' 
  },
  mainGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1.5fr',
    gap: '30px',
    marginBottom: '30px'
  },
  card: { 
    backgroundColor: '#fff', 
    padding: '25px', 
    borderRadius: '15px', 
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    flex: '1 1 300px',
    color: '#333'
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px' 
  },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  button: { 
    padding: '15px', 
    backgroundColor: '#2ecc71', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background 0.3s'
  }
};
export default App;
