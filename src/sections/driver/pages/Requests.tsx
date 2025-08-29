import { Card, Button } from '../../../ui/primitives'

export default function Requests(){
  return (
    <div className="space-y-3">
      {[1,2,3].map(i=> (
        <Card key={i} className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Parent #{i}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Pickup/Drop · Schedule · Price</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Accept</Button>
            <Button variant="outline">Decline</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
