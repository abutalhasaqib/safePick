import { Card, Button } from '../../../ui/primitives'

export default function Ratings(){
  return (
    <Card className="p-6">
      <h2 className="font-semibold mb-2">Ratings & Reviews</h2>
      <p className="text-sm">4.6 average</p>
      <div className="mt-4 space-y-2">
        {[1,2,3].map(i => (
          <div key={i} className="border rounded-xl p-3">
            <p className="text-sm">Great service. On time.</p>
            <div className="mt-2"><Button variant="outline">Reply</Button></div>
          </div>
        ))}
      </div>
    </Card>
  )
}
