import { Button, Card, Badge, Skeleton } from '../../../ui/primitives'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../../ui/PageHeader'

export default function DriverProfile() {
  const { id } = useParams()
  
  return (
    <div className="space-y-6">
      <PageHeader title="Driver Profile" />

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ramesh Kumar</h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Badge color="verified" className="px-3 py-2 text-sm font-medium">Police-verified</Badge>
            <Badge color="verified" className="px-3 py-2 text-sm font-medium">KYC-approved</Badge>
            <Badge className="px-3 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Seats left: 2
            </Badge>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              as-child 
              variant="outline"
              className="flex-1 py-3 border-2 border-slate-700 dark:border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
            >
              {/* @ts-ignore */}
              <Link to={`/parent/hire/${id}`}>Hire Monthly</Link>
            </Button>
            <Button 
              variant="secondary" 
              className="px-6 py-3 bg-skyBlue hover:bg-secondary text-slate-900 font-medium"
            >
              Chat
            </Button>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold mb-2">Schedule</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">Mon–Sat · AM/PM blocks</p>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold mb-2">Pricing</h2>
        <p className="text-sm">₹3,600 base + distance + stops</p>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold mb-2">Reviews</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">4.7 average · 120 reviews</p>
      </Card>
    </div>
  )
}
