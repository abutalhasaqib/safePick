# SafePick UI (Prototype)

React + Vite + Tailwind + shadcn-style primitives. Role-aware routes for Parent and Driver with dummy data and placeholders.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Structure
- src/shared: Layout, home, style guide, not-found
- src/ui: Navbar, Sidebar, Footer, Theme toggle, Toast, primitives
- src/sections/parent: Parent pages (auth, dashboard, discovery, profile, hire, payments, tracking, subscriptions, notifications, settings)
- src/sections/driver: Driver pages (onboarding, dashboard, route setup, requests, ride console, earnings, ratings, settings)

## Notes
- Light/dark mode auto + toggle
- Accessible sizes, focus rings, 12-col grid, rounded-2xl cards
- Map and payments use placeholders (swap with Mapbox/Google Maps and Razorpay)
- INR amounts and Indian context dummy data