import usa from '@svg-maps/usa';
import { MEMBERS, colorForBitmask } from './members.js';
import { load, save } from './storage.js';

const NS = 'http://www.w3.org/2000/svg';
const locations = usa.locations.filter(loc => loc.id !== 'dc');

let states = load() ?? Object.fromEntries(
  locations.map(loc => [loc.id, { visitors: 0 }])
);

function updateStatus() {
  const visited = Object.values(states).filter(s => s.visitors !== 0).length;
  document.getElementById('status').textContent =
    `${visited} / ${locations.length} states visited`;
}

function buildLegend() {
  const legend = document.getElementById('legend');

  const unvisited = document.createElement('div');
  unvisited.className = 'legend-item';
  unvisited.innerHTML = '<span class="legend-swatch" style="background:#d0d0d0"></span>Not visited';
  legend.appendChild(unvisited);

  for (const member of MEMBERS) {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML =
      `<span class="legend-swatch" style="background:${member.color}"></span>${member.name}`;
    legend.appendChild(item);
  }
}

function buildMap() {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', usa.viewBox);
  svg.setAttribute('xmlns', NS);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'US states map');

  for (const loc of locations) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('id', `state-${loc.id}`);
    path.setAttribute('d', loc.path);
    path.setAttribute('fill', colorForBitmask(states[loc.id].visitors));
    path.setAttribute('aria-label', loc.name);

    const title = document.createElementNS(NS, 'title');
    title.textContent = loc.name;
    path.appendChild(title);

    path.addEventListener('click', () => openPanel(loc.id));
    svg.appendChild(path);
  }

  document.getElementById('map-container').appendChild(svg);
}

function updateStatePath(id) {
  document.getElementById(`state-${id}`)
    ?.setAttribute('fill', colorForBitmask(states[id].visitors));
}

function openPanel(id) {
  const loc = locations.find(l => l.id === id);
  document.getElementById('panel-state-name').textContent = loc.name;

  const container = document.getElementById('panel-members');
  container.innerHTML = '';

  MEMBERS.forEach((member, i) => {
    const bit = 1 << i;

    const label = document.createElement('label');
    label.className = 'member-label';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = (states[id].visitors & bit) !== 0;
    input.addEventListener('change', () => {
      states[id].visitors = input.checked
        ? states[id].visitors | bit
        : states[id].visitors & ~bit;
      updateStatePath(id);
      save(states);
      updateStatus();
    });

    const swatch = document.createElement('span');
    swatch.className = 'member-swatch';
    swatch.style.background = member.color;

    label.appendChild(input);
    label.appendChild(swatch);
    label.appendChild(document.createTextNode(member.name));
    container.appendChild(label);
  });

  document.getElementById('member-panel').hidden = false;
}

document.getElementById('panel-close').addEventListener('click', () => {
  document.getElementById('member-panel').hidden = true;
});

buildLegend();
buildMap();
updateStatus();
