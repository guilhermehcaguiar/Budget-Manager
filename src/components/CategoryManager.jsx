import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from './CategoryManager.module.css';

export default function CategoryManager({ categories, onChange }) {
  const [tab, setTab] = useState('despesa');
  const [form, setForm] = useState({ name: '', icon: '💰', color: '#6b8cff' });
  const [error, setError] = useState('');
  
  const [showEmoji, setShowEmoji] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleAdd = () => {
    if (!form.name.trim()) { setError('Digite um nome.'); return; }
    const already = categories[tab].find(
      c => c.name.toLowerCase() === form.name.trim().toLowerCase()
    );
    if (already) { setError('Categoria já existe.'); return; }

    const updated = {
      ...categories,
      [tab]: [...categories[tab], { ...form, name: form.name.trim() }],
    };
    onChange(updated);
    setForm({ name: '', icon: '💰', color: '#6b8cff' });
    setError('');
  };

  const handleDelete = (type, name) => {
    const updated = {
      ...categories,
      [type]: categories[type].filter(c => c.name !== name),
    };
    onChange(updated);
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Gerenciar Categorias</h2>

      <div className={styles.tabs}>
        {['despesa', 'receita'].map(t => (
          <button
            key={t}
            className={`${styles.tab} ${tab === t ? styles.active : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'despesa' ? '↓ Despesas' : '↑ Receitas'}
          </button>
        ))}
      </div>

      {/* Lista de categorias existentes */}
      <div className={styles.list}>
        {categories[tab].map(cat => (
          <div key={cat.name} className={styles.catItem}>
            <span
              className={styles.catIcon}
              style={{ background: cat.color + '33', color: cat.color }}
            >
              {cat.icon}
            </span>
            <span className={styles.catName}>{cat.name}</span>
            <span className={styles.catColor}>
              <span
                className={styles.colorDot}
                style={{ background: cat.color }}
              />
              {cat.color}
            </span>
            <button
              className={styles.delBtn}
              onClick={() => handleDelete(tab, cat.name)}
              title="Excluir categoria"
            >
              ×
            </button>
          </div>
        ))}
        {categories[tab].length === 0 && (
          <p className={styles.empty}>Nenhuma categoria. Crie uma abaixo.</p>
        )}
      </div>

      {/* Formulário de nova categoria */}
      <div className={styles.form}>
        <p className={styles.formTitle}>Nova categoria de {tab}</p>

        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ex: Academia"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Cor (Hex ou RGB)</label>
            <div className={styles.colorRow}>
              {/* Seletor visual de cor */}
              <input
                className={styles.colorPicker}
                type="color"
                value={form.color}
                onChange={e => set('color', e.target.value)}
              />
              {/* Campo de texto para digitar qualquer código de cor */}
              <input
                className={styles.input}
                style={{ width: '120px', marginLeft: '10px' }}
                type="text"
                value={form.color}
                onChange={e => set('color', e.target.value)}
                placeholder="#6b8cff ou rgb()"
              />
            </div>
          </div>
        </div>

        {/* Campo de Ícone com Emoji Picker */}
        <div className={styles.field} style={{ marginTop: '16px', marginBottom: '16px', position: 'relative' }}>
          <label className={styles.label}>Ícone</label>
          <button
            type="button"
            className={styles.input}
            style={{ width: '80px', fontSize: '20px', textAlign: 'center', cursor: 'pointer', background: 'transparent' }}
            onClick={() => setShowEmoji(!showEmoji)}
            title="Clique para escolher um emoji"
          >
            {form.icon}
          </button>

          {/* Janela do Emoji Picker */}
          {showEmoji && (
            <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: '8px' }}>
              <EmojiPicker 
                theme="dark"
                onEmojiClick={(emojiData) => {
                  set('icon', emojiData.emoji);
                  setShowEmoji(false); // Fecha a janela após escolher
                }} 
              />
            </div>
          )}
        </div>

        {/* Preview */}
        <div className={styles.preview}>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Preview:</span>
          <span
            className={styles.previewBadge}
            style={{ background: form.color + '22', color: form.color, border: `1px solid ${form.color}44` }}
          >
            {form.icon} {form.name || 'Nome da categoria'}
          </span>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.addBtn} onClick={handleAdd}>
          + Criar categoria
        </button>
      </div>
    </div>
  );
}