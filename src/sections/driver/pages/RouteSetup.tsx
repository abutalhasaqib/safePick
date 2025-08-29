import { Card, Input, Button } from '../../../ui/primitives'

export default function RouteSetup(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">Service Area</h2>
        <Input placeholder="Draw polygon or radius" />
        <Input placeholder="Preferred schools" />
        <Input placeholder="Time windows" />
        <Input placeholder="Capacity" />
        <Input placeholder="Base monthly price" />
        <Button>Save</Button>
      </Card>
      <Card className="p-6 h-80 flex items-center justify-center">Map placeholder</Card>
    </div>
  )
}
