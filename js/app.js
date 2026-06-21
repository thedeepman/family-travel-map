import usa from '@svg-maps/usa';
import { load, save } from './storage.js';

const COLOR_VISITED = '#4caf50';
const COLOR_UNVISITED = '#d0d0d0';

const NS = 'http://www.w3.org/2000/svg';

function initStates() {
  const saved = load();
  if (saved) return saved;
  return Object.fromEntries(
    usa.locations.map(loc => [loc.id, { visited: false }])
  );
}

let states = initStates();

function fillColor(id) {
  return states[id]?.visited ? COLOR_VISITED : COLOR_UNVISITED;
}

function updateStatus() {
  const visited = Object.values(states).filter(s => s.visited).length;
  document.getElementById('status').textContent =
    `${visited} / ${usa.locations.length} states visited`;
}

function buildMap() {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', usa.viewBox);
  svg.setAttribute('xmlns', NS);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'US states map');

  for (const loc of usa.locations) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('id', `state-${loc.id}`);
    path.setAttribute('d', loc.path);
    path.setAttribute('fill', fillColor(loc.id));
    path.setAttribute('aria-label', loc.name);

    const title = document.createElementNS(NS, 'title');
    title.textContent = loc.name;
    path.appendChild(title);

    path.addEventListener('click', () => toggleState(loc.id, path));
    svg.appendChild(path);
  }

  document.getElementById('map-container').appendChild(svg);
}

function toggleState(id, path) {
  states[id].visited = !states[id].visited;
  path.setAttribute('fill', fillColor(id));
  save(states);
  updateStatus();
}

buildMap();
updateStatus();
