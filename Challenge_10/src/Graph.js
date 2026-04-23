import CityNode from "./CityNode.js";
import PersonNode from "./PersonNode.js";

class Graph {
    constructor() {
        this.nodes = [];        // Lista de todos los nodos (personas y ciudades)
        this.adjacency = {};    // Objeto de adyacencia: { nodeId: [nodeId, ...] }
        this._idCounter = 0;
    }

    addCity(name) {
        const id = this._idCounter++;
        const cityNode = new CityNode(name);
        this.nodes.push({ id, type: "city", data: cityNode });
        this.adjacency[id] = [];
        return id;
    }

    addPerson(name, age, cityId) {
        const cityEntry = this.nodes.find(n => n.id === cityId && n.type === "city");
        if (!cityEntry) {
            console.error(`City with id ${cityId} not found.`);
            return null;
        }

        const id = this._idCounter++;
        const personNode = new PersonNode(name, age, cityEntry.data.name);
        this.nodes.push({ id, type: "person", data: personNode });
        this.adjacency[id] = [];

        this.addEdge(id, cityId);
        return id;
    }

    addEdge(nodeIdA, nodeIdB) {
        if (this.adjacency[nodeIdA] !== undefined && this.adjacency[nodeIdB] !== undefined) {
            this.adjacency[nodeIdA].push(nodeIdB);
            this.adjacency[nodeIdB].push(nodeIdA);
        }
    }

    searchNode(id) {
        return this.nodes.find(n => n.id === id) || null;
    }

    getPeopleByCity(cityId) {
        const cityEntry = this.searchNode(cityId);
        if (!cityEntry || cityEntry.type !== "city") return [];

        return this.adjacency[cityId]
            .map(id => this.searchNode(id))
            .filter(n => n && n.type === "person");
    }

    printGraph() {
        this.nodes.forEach(node => {
            const label = node.type === "city"
              ? `[City] ${node.data.name}`
              : `[Person] ${node.data.name} (${node.data.age}y) — City: ${node.data.city}`;
            const neighbors = this.adjacency[node.id].map(id => {
                const n = this.searchNode(id);
                return n ? n.data.name : id;
            });
            console.log(`  ${label} → [${neighbors.join(", ")}]`);
        });
    }

    toD3GraphData() {
        const graphNodes = this.nodes.map(n => ({
            id: String(n.id),
            label: n.type === "city" ? n.data.name : `${n.data.name}\n${n.data.age}a`,
            color: n.type === "city" ? "#5DCAA5" : "#AFA9EC",
            size: n.type === "city" ? 500 : 300,
        }));

        const seen = new Set();
        const graphLinks = [];
        this.nodes.forEach(node => {
            this.adjacency[node.id].forEach(neighborId => {
                const key = [node.id, neighborId].sort().join("-");
                if (!seen.has(key)) {
                    seen.add(key);
                    graphLinks.push({ source: String(node.id), target: String(neighborId) });
                }
            });
        });

        return { nodes: graphNodes, links: graphLinks };
    }

searchNode(id) {
  return this.nodes.find(n => n.id === id) || null;
}

getPeopleByCity(cityId) {
  const cityEntry = this.searchNode(cityId);
  if (!cityEntry || cityEntry.type !== "city") return [];

  return this.adjacency[cityId]
    .map(id => this.searchNode(id))
    .filter(n => n && n.type === "person");
}

printGraph() {
  this.nodes.forEach(node => {
    const label = node.type === "city"
      ? `[City] ${node.data.name}`
      : `[Person] ${node.data.name} (${node.data.age}y) — City: ${node.data.city}`;
    const neighbors = this.adjacency[node.id].map(id => {
      const n = this.searchNode(id);
      return n ? n.data.name : id;
    });
    console.log(`  ${label} → [${neighbors.join(", ")}]`);
  });
}

toD3GraphData() {
  const graphNodes = this.nodes.map(n => ({
    id: String(n.id),
    label: n.type === "city" ? n.data.name : `${n.data.name}\n${n.data.age}a`,
    color: n.type === "city" ? "#5DCAA5" : "#AFA9EC",
    size: n.type === "city" ? 500 : 300,
  }));

  const seen = new Set();
  const graphLinks = [];
  this.nodes.forEach(node => {
    this.adjacency[node.id].forEach(neighborId => {
      const key = [node.id, neighborId].sort().join("-");
      if (!seen.has(key)) {
        seen.add(key);
        graphLinks.push({ source: String(node.id), target: String(neighborId) });
      }
    });
  });
  
    return { nodes: graphNodes, links: graphLinks };
    }
}

export default Graph;