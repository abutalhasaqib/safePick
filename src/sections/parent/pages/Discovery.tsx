import { useState } from 'react'
import { Card, Button, Input, Badge, Skeleton } from '../../../ui/primitives'
import { Link } from 'react-router-dom'
import Map from '../../../ui/Map'

type Driver = {
  id: string
  name: string
  rating: number
  price: number
  verified: boolean
  route: string
  vehicle: 'Auto' | 'Car'
  location: {
    latitude: number
    longitude: number
  }
}

const DUMMY: Driver[] = [
  { 
    id: '1', 
    name: 'Ramesh Kumar', 
    rating: 4.7, 
    price: 3600, 
    verified: true, 
    route: 'Andheri → Dhirubhai Ambani Int. School', 
    vehicle: 'Auto',
    location: { latitude: 19.1136, longitude: 72.8697 } // Andheri
  },
  { 
    id: '2', 
    name: 'Amit Sharma', 
    rating: 4.5, 
    price: 4200, 
    verified: true, 
    route: 'Powai → Hiranandani School', 
    vehicle: 'Car',
    location: { latitude: 19.1197, longitude: 72.9047 } // Powai
  },
  { 
    id: '3', 
    name: 'Salim Khan', 
    rating: 4.2, 
    price: 3000, 
    verified: false, 
    route: 'Bandra → St. Andrews', 
    vehicle: 'Auto',
    location: { latitude: 19.0596, longitude: 72.8295 } // Bandra
  },
  { 
    id: '4', 
    name: 'Prakash Yadav', 
    rating: 4.8, 
    price: 3800, 
    verified: true, 
    route: 'Juhu → Jamnabai Narsee', 
    vehicle: 'Auto',
    location: { latitude: 19.1075, longitude: 72.8263 } // Juhu
  },
  { 
    id: '5', 
    name: 'Farhan Shaikh', 
    rating: 4.4, 
    price: 3500, 
    verified: true, 
    route: 'Kurla → Don Bosco', 
    vehicle: 'Auto',
    location: { latitude: 19.0728, longitude: 72.8826 } // Kurla
  },
]

export default function Discovery() {
  const [q, setQ] = useState('')
  const filtered = DUMMY.filter(d => d.name.toLowerCase().includes(q.toLowerCase()))
  
  // Create markers for the map
  const mapMarkers = filtered.map(driver => ({
    latitude: driver.location.latitude,
    longitude: driver.location.longitude,
    title: `${driver.name} - ${driver.route}`,
    color: driver.verified ? '#FBBF24' : '#94A3B8'
  }))

  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-6">
      <aside className="col-span-12 lg:col-span-4 order-2 lg:order-1">
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold">Filters</h3>
          <Input placeholder="Search by name" value={q} onChange={e=>setQ(e.target.value)} />
          <div className="flex gap-2 flex-wrap">
            <Badge color="verified">Verified</Badge>
            <Badge>Auto</Badge>
            <Badge>Car</Badge>
          </div>
        </Card>
      </aside>
      <section className="col-span-12 lg:col-span-8 space-y-3 order-1 lg:order-2">
        <Map 
          className="h-56 sm:h-60" 
          markers={mapMarkers}
          center={[72.8777, 19.0760]} // Mumbai center
          zoom={11}
        />
        <div className="space-y-4">
          {filtered.map(d => (
            <Card key={d.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{d.name}</h4>
                    {d.verified && <Badge color="verified" className="text-xs">Verified</Badge>}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{d.route}</p>
                  <p className="text-base font-medium text-slate-900 dark:text-white">₹{d.price.toLocaleString('en-IN')}/month</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[140px]">
                  <Button 
                    as-child 
                    variant="outline" 
                    className="text-sm py-2 px-4 border-2 border-slate-700 dark:border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {/* @ts-ignore */}
                    <Link to={`/parent/driver/${d.id}`}>View Profile</Link>
                  </Button>
                  <Button 
                    as-child 
                    className="text-sm py-2 px-4 bg-primary hover:bg-golden text-slate-900 font-medium shadow-md"
                  >
                    {/* @ts-ignore */}
                    <Link to={`/parent/hire/${d.id}`}>Hire Monthly</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-slate-600 dark:text-slate-300">No drivers match your filters.</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
