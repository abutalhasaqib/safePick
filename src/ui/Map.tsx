import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// You'll need to get your own Mapbox access token from https://account.mapbox.com/access-tokens/
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFsaGEtZGV2IiwiYSI6ImNsbTFqb2pkdzBkeDkzZm8wMWRwMnY3OGEifQ.placeholder' // Replace with your actual token

interface MapProps {
  className?: string
  markers?: Array<{
    latitude: number
    longitude: number
    title?: string
    color?: string
  }>
  center?: [number, number] // [longitude, latitude]
  zoom?: number
  style?: string
}

export default function Map({ 
  className = '', 
  markers = [], 
  center = [72.8777, 19.0760], // Mumbai coordinates as default
  zoom = 11,
  style = 'mapbox://styles/mapbox/light-v11'
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (map.current) return // Initialize map only once

    if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes('placeholder')) {
      // Fallback to OpenStreetMap if no Mapbox token
      return
    }

    mapboxgl.accessToken = MAPBOX_TOKEN

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: style,
        center: center,
        zoom: zoom,
        attributionControl: false
      })

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.current.on('load', () => {
        setMapLoaded(true)
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker')
    existingMarkers.forEach(marker => marker.remove())

    // Add new markers
    markers.forEach((marker) => {
      const el = document.createElement('div')
      el.className = 'mapboxgl-marker'
      el.style.backgroundColor = marker.color || '#FBBF24'
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.border = '2px solid white'
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'

      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(marker.title ? new mapboxgl.Popup().setHTML(`<p class="text-sm font-medium">${marker.title}</p>`) : undefined)
        .addTo(map.current!)
    })
  }, [markers, mapLoaded])

  // Fallback map using OpenStreetMap (no API key required)
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes('placeholder')) {
    return (
      <div className={`relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden ${className}`}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '240px' }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=72.7777,18.9760,72.9777,19.1760&layer=mapnik&marker=${center[1]},${center[0]}`}
          title="Map"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 px-3 py-2 rounded-lg">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Interactive Map • Mumbai Area
          </p>
        </div>
        {markers.map((marker, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md"
            style={{
              left: `${50 + (marker.longitude - center[0]) * 1000}%`,
              top: `${50 - (marker.latitude - center[1]) * 1000}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={marker.title}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full min-h-[240px]" />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
