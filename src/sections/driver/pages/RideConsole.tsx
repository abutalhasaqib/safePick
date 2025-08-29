import { Card, Button } from '../../../ui/primitives'

export default function RideConsole(){
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 p-6 h-96 flex items-center justify-center">Route + ETA placeholder</Card>
      <Card className="p-6 space-y-3">
        <Button className="w-full">Start Trip</Button>
        <Button className="w-full" variant="outline">End Trip</Button>
      </Card>
    </div>
  )
}
