import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [transacoes, setTransacoes] = useState([])
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState('')
  const buscarDados = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/transacoes')
      setTransacoes(res.data)
} catch (err) {
      console.error('Erro ao buscar transações:', err)
    }
  }
  const salvarGasto = async (event) => {
    event.preventDefault() 
    
    const novoGasto = { 
      descricao, 
      valor: parseFloat(valor), 
      categoria, 
      data: new Date().toISOString().split('T')[0] 
    }
    try {
      await axios.post('http://localhost:8080/api/transacoes', novoGasto)
      setDescricao(''); setValor(''); setCategoria('')
      buscarDados() 
    } catch (err) {
      alert("Erro ao salvar no Java!")
    }
  }
  useEffect(() => {
    buscarDados()
  }, [])
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '500px', margin: 'auto' }}>
      <h1>Budget Manager</h1>

      <form onSubmit={salvarGasto} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
        <input placeholder="Valor" type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} required />
        <input placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} required />
        <button type="submit" style={{ cursor: 'pointer', background: '#28a745', color: 'white', border: 'none', padding: '10px' }}>
          Salvar Transação
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <ul>
        {transacoes.map(t => (
          <li key={t.id} style={{ marginBottom: '10px' }}>
            <strong>{t.descricao}</strong>: R$ {t.valor} <small>({t.categoria})</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App
