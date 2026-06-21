# Family Travel History Map — Project Plan

## Goal
Build a fresh family travel history map app using an SVG US map and modern JavaScript. Start with a simple visited/unvisited version, then add family visitor combinations, state details, and a backend-ready architecture.

## Scope
This project will be developed in small, testable slices:
- [x] Phase 1: Simple state visit tracking
- [x] Phase 2: Family member combinations
- [ ] Phase 3: Usability and detail UI
- [ ] Phase 4: Backend-ready persistence

## Architecture
Use a static app with:
- `index.html` — app shell, SVG container, controls
- `css/main.css` — styling, legend, detail panel
- `js/app.js` — core data and map rendering
- `js/members.js` — fixed family roster and combination color logic
- `js/storage.js` — persistence abstraction for `localStorage` and later API storage

Keep the code modular so the app can later migrate to a framework if needed.

## ✅ Phase 1: MVP

### Decisions
- **SVG map source** — `@svg-maps/usa` (MIT), default export, lowercase state IDs (`ak`, `ca`, …). DC filtered out; 50 states only.
- **Dev environment** — Vite (`npm run dev`). Serves `index.html` as entry point, supports ES modules and HMR.

### Objectives
- [x] Load the US SVG map and ensure each state has a stable ID
- [x] Create a simple 50-state data model with `visited: true/false`
- [x] Render map fills using two configurable colors
- [x] Add UI to toggle state visit status
- [x] Persist the data in the browser via `localStorage`

### Verification
- [x] Each state path is selectable from JavaScript
- [x] Clicking a state toggles its color immediately
- [x] State visit data persists after page reload

## ✅ Phase 2: Family combinations

### Decisions
- **Family member definition** — Fixed roster: Dad, Mom, Child 1, Child 2. Bitmask key (Dad=bit 0, Mom=bit 1, …). Roster lives in `js/members.js`.
- **Combination color strategy** — Auto-generated: RGB average of active members' base colors. Scales to any combo without a palette; some blends are muted (known tradeoff).

### Objectives
- [x] Extend the state model so it stores which family members have visited
- [x] Use a consistent combination key (bitmask integer per state)
- [x] Define colors for each visit combination (auto-blended from member colors)
- [x] Add a legend that explains the current combination colors
- [x] Add UI to assign family members to each state
- [x] Persist member and combination data in `localStorage`

### Verification
- [x] The model stores multiple visitors per state
- [x] Each combination maps to a consistent color
- [x] Changing visitors updates the state colors correctly
- [x] The legend accurately reflects current color assignments

## Phase 3: Usability enhancements

### Decisions before beginning
- **Detail UI pattern** — Choose between an inline side panel (always visible, updates on click) or a modal dialog (opens on click, dismissed explicitly). The choice affects layout CSS from Phase 1 onward; retrofitting a side panel into a full-width layout is disruptive.
- **Filter scope** — Decide what filtering means: filter the map colors, show a separate list, or both. This determines whether filters are a view-layer concern or require changes to the data model.

### Objectives
- [ ] Add a state detail panel or modal for visit details
- [ ] Display which people have visited each state
- [ ] Allow editing state visitor lists in the detail UI
- [ ] Add optional filters or lists for visited states

### Verification
- [ ] Clicking a state opens a detail view
- [ ] The detail view shows the current visitor list and updates map state
- [ ] Users can view states by visited status or by people

## Phase 4: Backend-ready architecture

### Decisions before beginning
- **Storage interface scope** — If `storage.js` was built with a clean read/write interface in Phase 1, verify whether Phase 4 is primarily validation work or whether the interface needs to be redesigned. Avoid duplicating effort by auditing what already exists before planning new abstractions.
- **Serialization contract** — Define the exact JSON shape for the payload before writing serialization code. Changing the shape later requires a migration for existing `localStorage` data.

### Objectives
- [ ] Abstract persistence into a storage module
- [ ] Define a serializable JSON payload shape for the map and visit data
- [ ] Keep UI logic independent of storage implementation
- [ ] Reserve room for later backend API integration

### Verification
- [ ] Persistence is isolated to a single storage module
- [ ] Data can be serialized cleanly for backend use
- [ ] A stubbed API can replace `localStorage` without major UI changes

## Future considerations
- Custom family member definitions vs fixed initial members
- Legend scope: show all possible combinations or only combinations currently present
- Whether to support separate profiles per user or one shared family map
- Trip history details such as dates, notes, and links
