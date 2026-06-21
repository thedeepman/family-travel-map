const KEY = 'family-travel-map-v1';

export function load() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
