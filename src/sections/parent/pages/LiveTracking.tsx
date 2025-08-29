import { Card, Button } from '../../../ui/primitives'

export default function LiveTracking(){
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 p-6 h-96 flex items-center justify-center">Live Map placeholder</Card>
      <Card className="p-6 space-y-3">
        <Button className="w-full" variant="danger">SOS</Button>
        <Button className="w-full" variant="outline">Share Live</Button>
        <Button className="w-full" variant="secondary">Call Driver</Button>
      </Card>
    </div>
  )
}
