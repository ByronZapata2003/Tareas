import { useState, useMemo } from 'react'
import { SmartSearchEngine } from './dataStructures/SmartSearchEngine'
import './App.css'

// ─── Datos iniciales (igual que el ejemplo del enunciado) ───
const INITIAL_PRODUCTS = [
  { name: 'air max',     popularity: 90 },
  { name: 'air force',  popularity: 95 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 },
]

export default function App() {
  const [products, setProducts]   = useState(INITIAL_PRODUCTS)
  const [prefix, setPrefix]       = useState('')
  const [k, setK]                 = useState(2)
  const [newName, setNewName]     = useState('')
  const [newPop, setNewPop]       = useState('')

  // Reconstruye el engine cada vez que cambia la lista de productos
  const engine = useMemo(() => {
    const e = new SmartSearchEngine()
    products.forEach(p => e.insert(p.name, p.popularity))
    return e
  }, [products])

  // Resultados del Top K según el prefijo actual
  const results = useMemo(() => {
    if (!prefix.trim()) return []
    return engine.searchTopK(prefix.trim(), k)
  }, [engine, prefix, k])

  function handleInsert() {
    const name = newName.trim()
    const pop  = parseInt(newPop)
    if (!name || isNaN(pop) || pop < 0 || pop > 100) return
    setProducts(prev => [...prev, { name, popularity: pop }])
    setNewName('')
    setNewPop('')
  }


  return (
    <div className="app">
      <h1>Challenge 11 — Smart Search Engine</h1>
      <p className="subtitle">Trie + MinHeap · Estructuras de Datos II</p>

      {/* ── Buscador ── */}
      <section className="card">
        <h2>Buscar por prefijo</h2>
        <div className="search-row">
          <input
            type="text"
            placeholder="Escribe un prefijo... (ej: air)"
            value={prefix}
            onChange={e => setPrefix(e.target.value)}
          />
          <label>
            Top K:
            <input
              type="number"
              min={1} max={10}
              value={k}
              onChange={e => setK(parseInt(e.target.value) || 1)}
              className="k-input"
            />
          </label>
        </div>

        <div className="results">
          {prefix.trim() === '' && (
            <p className="hint">Escribe un prefijo para ver resultados</p>
          )}
          {prefix.trim() !== '' && results.length === 0 && (
            <p className="hint">Sin resultados para "{prefix}"</p>
          )}
          {results.map((r, i) => (
            <div key={r.name} className="result-row">
              <span className="rank">#{i + 1}</span>
              <span className="result-name">{r.name}</span>
              <div className="bar-wrap">
                <div className="bar" style={{ width: `${r.popularity}%` }} />
              </div>
              <span className="pop-val">{r.popularity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Insertar nuevo producto ── */}
      <section className="card">
        <h2>Insertar producto</h2>
        <div className="insert-row">
          <input
            type="text"
            placeholder="nombre"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="popularidad (0-100)"
            value={newPop}
            onChange={e => setNewPop(e.target.value)}
            min={0} max={100}
          />
          <button onClick={handleInsert}>+ Insertar</button>
        </div>
      </section>

      {/* ── Lista de productos ── */}
      <section className="card">
        <h2>Productos en el Trie ({products.length})</h2>
        <div className="chips">
          {products.map(p => (
            <span
              key={p.name}
              className={`chip ${prefix && p.name.toLowerCase().startsWith(prefix.toLowerCase()) ? 'match' : ''}`}
            >
              {p.name} · {p.popularity}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}