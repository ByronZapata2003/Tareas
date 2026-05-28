// ============================================================
//  app.js — Lógica principal de Spotify Edu
//  Conecta: Trie, MaxHeap y Graph con la interfaz HTML
// ============================================================

// ── Datos de ejemplo ──────────────────────────────────────────
const CANCIONES_EJEMPLO = [
  { titulo: "Blinding Lights",    artista: "The Weeknd",     reproducciones: 3500000 },
  { titulo: "Shape of You",       artista: "Ed Sheeran",     reproducciones: 3200000 },
  { titulo: "Stay",               artista: "The Kid LAROI",  reproducciones: 2900000 },
  { titulo: "Bad Guy",            artista: "Billie Eilish",  reproducciones: 2600000 },
  { titulo: "Levitating",         artista: "Dua Lipa",       reproducciones: 2400000 },
  { titulo: "Sunflower",          artista: "Post Malone",    reproducciones: 2200000 },
  { titulo: "Starboy",            artista: "The Weeknd",     reproducciones: 2100000 },
  { titulo: "Save Your Tears",    artista: "The Weeknd",     reproducciones: 2000000 },
  { titulo: "Peaches",            artista: "Justin Bieber",  reproducciones: 1900000 },
  { titulo: "Montero",            artista: "Lil Nas X",      reproducciones: 1800000 },
  { titulo: "Butter",             artista: "BTS",            reproducciones: 1750000 },
  { titulo: "Kiss Me More",       artista: "Doja Cat",       reproducciones: 1600000 },
  { titulo: "Good 4 U",           artista: "Olivia Rodrigo", reproducciones: 1550000 },
  { titulo: "Drivers License",    artista: "Olivia Rodrigo", reproducciones: 1500000 },
  { titulo: "Shivers",            artista: "Ed Sheeran",     reproducciones: 1450000 },
  { titulo: "Industry Baby",      artista: "Lil Nas X",      reproducciones: 1400000 },
  { titulo: "Heat Waves",         artista: "Glass Animals",  reproducciones: 1350000 },
  { titulo: "Love Story",         artista: "Taylor Swift",   reproducciones: 1300000 },
  { titulo: "Shake It Off",       artista: "Taylor Swift",   reproducciones: 1250000 },
  { titulo: "Anti-Hero",          artista: "Taylor Swift",   reproducciones: 1200000 },
];

// Conexiones del grafo (canciones relacionadas)
const CONEXIONES_GRAFO = [
  ["Blinding Lights",  "Starboy"],
  ["Blinding Lights",  "Save Your Tears"],
  ["Starboy",          "Save Your Tears"],
  ["Shape of You",     "Shivers"],
  ["Shape of You",     "Bad Guy"],
  ["Bad Guy",          "Good 4 U"],
  ["Good 4 U",         "Drivers License"],
  ["Drivers License",  "Love Story"],
  ["Love Story",       "Shake It Off"],
  ["Shake It Off",     "Anti-Hero"],
  ["Levitating",       "Kiss Me More"],
  ["Levitating",       "Stay"],
  ["Stay",             "Peaches"],
  ["Peaches",          "Butter"],
  ["Butter",           "Industry Baby"],
  ["Montero",          "Industry Baby"],
  ["Sunflower",        "Heat Waves"],
  ["Heat Waves",       "Stay"],
];

// ── Instancias de las estructuras ─────────────────────────────
const trie    = new Trie();
const maxHeap = new MaxHeap();
const graph   = new Graph();

// ── Inicializar datos ─────────────────────────────────────────
function inicializarEstructuras() {
  CANCIONES_EJEMPLO.forEach(({ titulo, reproducciones }) => {
    trie.insertar(titulo);
    maxHeap.insertar(titulo, reproducciones);
  });

  CONEXIONES_GRAFO.forEach(([c1, c2]) => graph.conectar(c1, c2));
}

// ── Estadísticas globales ─────────────────────────────────────
function actualizarStats() {
  document.getElementById("stat-canciones").textContent =
    CANCIONES_EJEMPLO.length;
  document.getElementById("stat-conexiones").textContent =
    graph.obtenerEstructura().aristas.length;
  document.getElementById("stat-top").textContent = "Top 5";
}

// ── TRIE — Buscador predictivo ────────────────────────────────
function manejarBusqueda(event) {
  const prefijo = event.target.value.trim();
  const contenedor = document.getElementById("sugerencias");
  const statusEl   = document.getElementById("busqueda-status");

  if (prefijo.length === 0) {
    contenedor.innerHTML = "";
    statusEl.textContent = "";
    return;
  }

  const sugerencias = trie.sugerencias(prefijo);
  const existe      = trie.buscar(prefijo);

  // Estado de la búsqueda exacta
  if (existe) {
    statusEl.innerHTML = `<span style="color: var(--green)">✓ Canción encontrada en el sistema</span>`;
  } else if (sugerencias.length > 0) {
    statusEl.textContent = `${sugerencias.length} sugerencia(s)`;
  } else {
    statusEl.textContent = "Sin resultados";
  }

  // Renderizar sugerencias
  if (sugerencias.length === 0) {
    contenedor.innerHTML = `
      <div class="suggestions__empty">
        No se encontraron canciones con ese prefijo
      </div>`;
    return;
  }

  contenedor.innerHTML = sugerencias
    .slice(0, 8)
    .map(titulo => `
      <div class="suggestions__item animate-in"
           onclick="seleccionarCancion('${titulo.replace(/'/g, "\\'")}')">
        <span>🎵 ${titulo}</span>
        <span class="suggestions__item__label">Sugerencia</span>
      </div>
    `)
    .join("");
}

function seleccionarCancion(titulo) {
  document.getElementById("input-busqueda").value = titulo;
  document.getElementById("sugerencias").innerHTML = "";
  document.getElementById("busqueda-status").innerHTML =
    `<span style="color: var(--green)">✓ Seleccionado: ${titulo}</span>`;

  // También buscar recomendaciones automáticamente
  buscarRecomendaciones(titulo);
  mostrarToast(`🎵 "${titulo}" seleccionado`);
}

// ── MAX HEAP — Ranking ────────────────────────────────────────
function renderizarRanking() {
  const top = maxHeap.obtenerTop(10);
  const maxRep = top[0]?.reproducciones || 1;
  const contenedor = document.getElementById("lista-ranking");

  const posClases = ["gold", "silver", "bronze"];

  contenedor.innerHTML = top.map((item, i) => {
    const pct     = ((item.reproducciones / maxRep) * 100).toFixed(1);
    const posClass = posClases[i] ?? "normal";
    const repFmt  = (item.reproducciones / 1_000_000).toFixed(1) + "M";

    return `
      <div class="ranking-item animate-in">
        <div class="ranking-item__position ranking-item__position--${posClass}">
          ${i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
        </div>
        <div class="ranking-item__info">
          <span class="ranking-item__info-title">${item.titulo}</span>
          <div class="ranking-item__bar-wrap">
            <div class="ranking-item__bar" style="width: ${pct}%"></div>
          </div>
        </div>
        <div class="ranking-item__plays">
          <span class="play-icon">▶</span>
          <span>${repFmt}</span>
        </div>
      </div>`;
  }).join("");
}

// ── GRAPH — Recomendaciones ───────────────────────────────────
function buscarRecomendaciones(cancion) {
  const contenedor = document.getElementById("graph-resultado");
  const recs = graph.recomendarBFS(cancion, 2);
  const directas = graph.obtenerRelacionadas(cancion);

  if (!graph.adyacencia.has(cancion)) {
    contenedor.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔗</div>
        <div class="empty-state__text">"${cancion}" no está en el grafo</div>
      </div>`;
    return;
  }

  contenedor.innerHTML = `
    <div class="graph-panel__result animate-in">
      <div class="graph-panel__selected">
        <span class="icon">🎯</span>
        <strong>${cancion}</strong>
        <span style="color: var(--text-muted); font-size: 0.75rem">
          — ${directas.length} conexion(es) directa(s)
        </span>
      </div>

      <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px">
        Recomendaciones (BFS profundidad 2):
      </div>
      <div class="graph-panel__recs">
        ${recs.length > 0
          ? recs.map(r => `
              <span class="graph-panel__rec-tag"
                    onclick="buscarRecomendaciones('${r.replace(/'/g, "\\'")}')">
                🎵 ${r}
              </span>`).join("")
          : `<span style="color: var(--text-muted); font-size: 0.8rem">Sin recomendaciones adicionales</span>`
        }
      </div>

      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px">
        Aristas directas:
      </div>
      <div class="graph-panel__edges">
        ${directas.map(d => `
          <div class="graph-panel__edge">
            <span class="edge-dot">●</span>
            ${cancion} ↔ ${d}
          </div>`).join("")}
      </div>
    </div>`;
}

function manejarSelectGrafo(event) {
  buscarRecomendaciones(event.target.value);
}

// ── Agregar canción (demo) ────────────────────────────────────
function agregarCancion() {
  const titulo = document.getElementById("nueva-cancion").value.trim();
  const repsStr = document.getElementById("nuevas-reps").value.trim();

  if (!titulo) return mostrarToast("⚠️ Ingresa un título");
  if (!repsStr || isNaN(+repsStr)) return mostrarToast("⚠️ Reproducciones inválidas");

  const reproducciones = parseInt(repsStr);
  trie.insertar(titulo);
  maxHeap.insertar(titulo, reproducciones);
  graph.agregarCancion(titulo);

  CANCIONES_EJEMPLO.push({ titulo, reproducciones });
  renderizarRanking();
  poblarSelectGrafo();
  actualizarStats();

  document.getElementById("nueva-cancion").value = "";
  document.getElementById("nuevas-reps").value = "";
  mostrarToast(`✅ "${titulo}" agregada al sistema`);
}

// ── Toast ─────────────────────────────────────────────────────
function mostrarToast(mensaje) {
  const t = document.getElementById("toast");
  t.textContent = mensaje;
  t.classList.add("toast--show");
  setTimeout(() => t.classList.remove("toast--show"), 2500);
}

// ── Poblar select del grafo ───────────────────────────────────
function poblarSelectGrafo() {
  const select = document.getElementById("select-grafo");
  const valor  = select.value;
  const nodos  = graph.obtenerEstructura().nodos;

  select.innerHTML = `<option value="">— Selecciona una canción —</option>` +
    nodos.map(n => `<option value="${n}"${n === valor ? " selected" : ""}>${n}</option>`).join("");
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  inicializarEstructuras();
  actualizarStats();
  renderizarRanking();
  poblarSelectGrafo();

  document.getElementById("input-busqueda")
    .addEventListener("input", manejarBusqueda);

  document.getElementById("select-grafo")
    .addEventListener("change", manejarSelectGrafo);

  document.getElementById("btn-agregar")
    .addEventListener("click", agregarCancion);
});