export const MEMBERS = [
  { id: 'dad',    name: 'Dad',     color: '#1976d2' },
  { id: 'mom',    name: 'Mom',     color: '#d32f2f' },
  { id: 'child1', name: 'Child 1', color: '#388e3c' },
  { id: 'child2', name: 'Child 2', color: '#f57c00' },
];

export function colorForBitmask(bitmask) {
  if (bitmask === 0) return '#d0d0d0';
  const active = MEMBERS.filter((_, i) => bitmask & (1 << i));
  const parse = (hex, pos) => parseInt(hex.slice(pos, pos + 2), 16);
  const avg = pos =>
    Math.round(active.reduce((s, m) => s + parse(m.color.slice(1), pos), 0) / active.length);
  return `#${[0, 2, 4].map(avg).map(v => v.toString(16).padStart(2, '0')).join('')}`;
}
