import { useState, useMemo, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import Graph from "./Graph";

function buildInitialGraph() {
  const g = new Graph();
  const caliId     = g.addCity("Cali");
  const bogotaId   = g.addCity("Bogotá");
  const medellinId = g.addCity("Medellín");

  g.addPerson("Andrés",  22, caliId);
  g.addPerson("Laura",   25, caliId);
  g.addPerson("Carlos",  30, bogotaId);
  g.addPerson("Sofía",   28, medellinId);
  g.addPerson("Juan",    21, bogotaId);

  return g;
}

export default function App() {
  const [graph]         = useState(() => buildInitialGraph());
  const [tick, setTick] = useState(0);

  const [cityFilter,     setCityFilter]     = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  const [personName,   setPersonName]   = useState("");
  const [personAge,    setPersonAge]    = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityName,     setCityName]     = useState("");

  const cities    = graph.getCities();
  const graphData = useMemo(() => graph.toD3GraphData(), [graph, tick]);

  const paintNode = useCallback((node, ctx, globalScale) => {
    const isCity = node.type === "city";
    const label  = node.label ? node.label.split("\n")[0] : "";
    const sub    = node.label && !isCity ? node.label.split("\n")[1] : null;
    const fontSize = Math.max(4, 11 / globalScale);

    if (isCity) {
      const w = 48, h = 22;
      ctx.fillStyle = "#5DCAA5";
      ctx.fillRect(node.x - w / 2, node.y - h / 2, w, h);
      ctx.strokeStyle = "#0F6E56";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(node.x - w / 2, node.y - h / 2, w, h);
    } else {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = "#AFA9EC";
      ctx.fill();
      ctx.strokeStyle = "#534AB7";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Nombre
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = isCity ? "#085041" : "#3C3489";
    ctx.fillText(label, node.x, node.y);

    // Edad (solo personas)
    if (sub) {
      ctx.font = `${Math.max(3, 9 / globalScale)}px sans-serif`;
      ctx.fillStyle = "#888780";
      ctx.fillText(sub, node.x, node.y + 18);
    }
  }, []);

  // ── Handlers ──────────────────────────────────
  function handleAddCity(e) {
    e.preventDefault();
    if (!cityName.trim()) return;
    graph.addCity(cityName.trim());
    setCityName("");
    setTick(t => t + 1);
  }

  function handleAddPerson(e) {
    e.preventDefault();
    if (!personName.trim() || !personAge || !selectedCity) return;
    graph.addPerson(personName.trim(), parseInt(personAge), parseInt(selectedCity));
    setPersonName("");
    setPersonAge("");
    setTick(t => t + 1);
  }

  function handleFilter() {
    if (!cityFilter) return;
    const people = graph.getPeopleByCity(parseInt(cityFilter));
    setFilteredPeople(people);
  }

  // ── Estilos reutilizables ──────────────────────
  const card  = { borderRadius: 10, padding: "14px 16px" };
  const inp   = { padding: "6px 10px", borderRadius: 8, border: "1px solid #D3D1C7", fontSize: 13 };
  const btn   = (bg, color = "#fff") => ({
    padding: "6px 16px", borderRadius: 8, background: bg,
    color, border: "none", fontWeight: 600, cursor: "pointer"
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>
        Challenge 10 — Grafo de Amigos y Ciudades
      </h1>
      <p style={{ color: "#5F5E5A", marginBottom: 16, fontSize: 14 }}>
        Estructuras de Datos II — Graph
      </p>

      {/* Leyenda */}
      <div style={{ display: "flex", gap: 20, marginBottom: 10, fontSize: 13 }}>
        <span>
          <span style={{ display:"inline-block", width:12, height:12, borderRadius:"50%",
            background:"#AFA9EC", border:"1.5px solid #534AB7", marginRight:6, verticalAlign:"middle" }}/>
          Persona
        </span>
        <span>
          <span style={{ display:"inline-block", width:12, height:8,
            background:"#5DCAA5", border:"1.5px solid #0F6E56", marginRight:6, verticalAlign:"middle" }}/>
          Ciudad
        </span>
      </div>

      {/* Grafo */}
      <div style={{ border:"1px solid #D3D1C7", borderRadius:12, overflow:"hidden",
        marginBottom:20, background:"#F9F8F5" }}>
        <ForceGraph2D
          graphData={graphData}
          nodeCanvasObject={paintNode}
          nodeCanvasObjectMode={() => "replace"}
          linkColor={() => "#B4B2A9"}
          linkWidth={1.5}
          width={852}
          height={420}
          enableNodeDrag={true}
          cooldownTicks={100}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 16, 0, 2 * Math.PI);
            ctx.fill();
          }}
        />
      </div>

      {/* Formularios */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>

        <div style={{ ...card, background:"#E1F5EE" }}>
          <h3 style={{ fontSize:14, marginBottom:10, margin:"0 0 10px" }}>Agregar Ciudad</h3>
          <form onSubmit={handleAddCity} style={{ display:"flex", gap:8 }}>
            <input value={cityName} onChange={e => setCityName(e.target.value)}
              placeholder="Nombre" style={{ ...inp, flex:1, border:"1px solid #9FE1CB" }} />
            <button type="submit" style={btn("#1D9E75")}>+ Ciudad</button>
          </form>
        </div>

        <div style={{ ...card, background:"#EEEDFE" }}>
          <h3 style={{ fontSize:14, margin:"0 0 10px" }}>Agregar Persona</h3>
          <form onSubmit={handleAddPerson} style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <input value={personName} onChange={e => setPersonName(e.target.value)}
              placeholder="Nombre" style={{ ...inp, width:90, border:"1px solid #CECBF6" }} />
            <input type="number" value={personAge} onChange={e => setPersonAge(e.target.value)}
              placeholder="Edad" min={1} max={120}
              style={{ ...inp, width:60, border:"1px solid #CECBF6" }} />
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              style={{ ...inp, border:"1px solid #CECBF6" }}>
              <option value="">Ciudad...</option>
              {cities.map(c => (
                <option key={c.id} value={c.id}>{c.data.name}</option>
              ))}
            </select>
            <button type="submit" style={btn("#7F77DD")}>+ Persona</button>
          </form>
        </div>
      </div>

      {/* Filtro */}
      <div style={{ ...card, background:"#F1EFE8" }}>
        <h3 style={{ fontSize:14, margin:"0 0 10px" }}>Personas por Ciudad</h3>
        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={inp}>
            <option value="">Selecciona una ciudad...</option>
            {cities.map(c => (
              <option key={c.id} value={c.id}>{c.data.name}</option>
            ))}
          </select>
          <button onClick={handleFilter} style={btn("#444441")}>Buscar</button>
        </div>

        {filteredPeople.length > 0 ? (
          <ul style={{ margin:0, paddingLeft:16 }}>
            {filteredPeople.map(person => (
              <li key={person.id} style={{ fontSize:14, marginBottom:4 }}>
                <strong>{person.data.name}</strong> — {person.data.age} años
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize:13, color:"#888780", margin:0 }}>
            {cityFilter ? "No hay personas en esta ciudad." : "Usa el filtro para ver resultados."}
          </p>
        )}
      </div>
    </div>
  );
}