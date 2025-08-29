# Map Integration Setup

## Getting a Mapbox Token (Recommended)

1. Go to [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
2. Sign up for a free account
3. Create a new access token
4. Copy the token and replace the placeholder in `src/ui/Map.tsx`

```tsx
const MAPBOX_TOKEN = 'your_actual_mapbox_token_here'
```

## Fallback Option

If you don't want to set up Mapbox, the component automatically falls back to OpenStreetMap (no API key required).

## Features

- ✅ Interactive map with zoom/pan controls
- ✅ Driver location markers
- ✅ Popup tooltips with driver info
- ✅ Responsive design
- ✅ Loading states
- ✅ Fallback to OpenStreetMap when no Mapbox token

## Mumbai Area Coverage

The map is centered on Mumbai with coordinates covering major areas like:
- Andheri
- Powai
- Bandra
- Juhu
- Kurla

Driver markers are color-coded:
- 🟡 Yellow: Verified drivers
- 🔘 Gray: Unverified drivers
