import { Card, Button } from '../../../ui/primitives'

export default function Subscriptions(){
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="font-semibold">Active Plan</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">Renews on 30 Sep · ₹3,600</p>
        <div className="mt-3 flex gap-2">
          <Button variant="outline">Pause</Button>
          <Button variant="danger">Cancel</Button>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold">History</h2>
        <p className="text-sm">Statements and past payments</p>
      </Card>
    </div>
  )
}
