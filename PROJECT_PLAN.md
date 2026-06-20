# Family Travel History Map — Project Plan

## Goal
Build a fresh family travel history map app using an SVG US map and modern JavaScript. Start with a simple visited/unvisited version, then add family visitor combinations, state details, and a backend-ready architecture.

## Scope
This project will be developed in small, testable slices:
- Phase 1: Simple state visit tracking
- Phase 2: Family member combinations
- Phase 3: Usability and detail UI
- Phase 4: Backend-ready persistence

## Architecture
Use a static app with:
- `index.html` — app shell, SVG container, controls
- `css/main.css` — styling, legend, detail panel
- `js/app.js` — core data and map rendering
- `js/storage.js` — persistence abstraction for `localStorage` and later API storage

Keep the code modular so the app can later migrate to a framework if needed.

## Phase 1: MVP

### Decisions before beginning
- **SVG map source** — Choose a specific free SVG map with stable, consistent state `id` attributes (e.g., `id="CA"`). Wikipedia's US map and D3-derived maps are common options. This is a hard blocker.
- **Dev environment** — Decide whether the app opens as a `file://` URL or via a local dev server. ES module `import` statements require a server; skipping modules means bundling everything in one script.

### Objectives
- Load the US SVG map and ensure each state has a stable ID
- Create a simple 50-state data model with `visited: true/false`
- Render map fills using two configurable colors
- Add UI to toggle state visit status
- Persist the data in the browser via `localStorage`

### Verification
- Each state path is selectable from JavaScript
- Clicking a state toggles its color immediately
- State visit data persists after page reload

## Phase 2: Family combinations

### Decisions before beginning
- **Family member definition** — Decide whether the family roster is fixed (hard-coded names like Dad, Mom, Child1, Child2) or user-defined at runtime. Fixed members allow a simple bitmask key; dynamic members require a sorted string-array key. This shapes the entire data model.
- **Combination color strategy** — With N members there are 2^N − 1 possible combinations (15 for 4 members, 31 for 5). Decide whether to pre-assign a color palette to a capped member count, auto-generate colors algorithmically, or show only combinations currently present in the data. Avoid leaving this open-ended or the legend and color logic will need to be redesigned later.

### Objectives
- Extend the state model so it stores which family members have visited
- Use a consistent combination key (for example, member ID arrays or a bitmask)
- Define colors for each visit combination
- Add a legend that explains the current combination colors
- Add UI to assign family members to each state
- Persist member and combination data in `localStorage`

### Verification
- The model stores multiple visitors per state
- Each combination maps to a consistent color
- Changing visitors updates the state colors correctly
- The legend accurately reflects current color assignments

## Phase 3: Usability enhancements

### Decisions before beginning
- **Detail UI pattern** — Choose between an inline side panel (always visible, updates on click) or a modal dialog (opens on click, dismissed explicitly). The choice affects layout CSS from Phase 1 onward; retrofitting a side panel into a full-width layout is disruptive.
- **Filter scope** — Decide what filtering means: filter the map colors, show a separate list, or both. This determines whether filters are a view-layer concern or require changes to the data model.

### Objectives
- Add a state detail panel or modal for visit details
- Display which people have visited each state
- Allow editing state visitor lists in the detail UI
- Add optional filters or lists for visited states

### Verification
- Clicking a state opens a detail view
- The detail view shows the current visitor list and updates map state
- Users can view states by visited status or by people

## Phase 4: Backend-ready architecture

### Decisions before beginning
- **Storage interface scope** — If `storage.js` was built with a clean read/write interface in Phase 1, verify whether Phase 4 is primarily validation work or whether the interface needs to be redesigned. Avoid duplicating effort by auditing what already exists before planning new abstractions.
- **Serialization contract** — Define the exact JSON shape for the payload before writing serialization code. Changing the shape later requires a migration for existing `localStorage` data.

### Objectives
- Abstract persistence into a storage module
- Define a serializable JSON payload shape for the map and visit data
- Keep UI logic independent of storage implementation
- Reserve room for later backend API integration

### Verification
- Persistence is isolated to a single storage module
- Data can be serialized cleanly for backend use
- A stubbed API can replace `localStorage` without major UI changes

## Future considerations
- Custom family member definitions vs fixed initial members
- Legend scope: show all possible combinations or only combinations currently present
- Whether to support separate profiles per user or one shared family map
- Trip history details such as dates, notes, and links

## Next steps
1. Create the initial static app shell with HTML, CSS, and JS.
2. Import or embed the SVG US map.
3. Implement Phase 1 and test `localStorage` persistence.
4. Add Phase 2 family combination logic in the next session.
