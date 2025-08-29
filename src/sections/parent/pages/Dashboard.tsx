import { Link } from 'react-router-dom'
import { Card, Button, Skeleton } from '../../../ui/primitives'

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 shadow-soft bg-gradient-to-r from-pastelYellow to-accent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Good morning, Ayesha</p>
            <h1 className="text-2xl font-semibold text-slate-900">Next ride ETA: 12 mins</h1>
          </div>
          <Button>
            {/* @ts-ignore */}
            <Link to="/parent/discovery">Find Drivers</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold">Active Subscription</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Driver: Ramesh Kumar · Verified</p>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary">Pause</Button>
            <Button variant="outline">Renew</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold">Safety Center</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Configure SOS and live share.</p>
          <div className="mt-4">
            <Button variant="outline">Open</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
