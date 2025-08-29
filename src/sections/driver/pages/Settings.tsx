import { Card, Input, Button } from '../../../ui/primitives'

export default function Settings(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">Profile</h2>
        <Input placeholder="Driver name" />
        <Input placeholder="Languages" />
        <Button>Save</Button>
      </Card>
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">Bank details</h2>
        <Input placeholder="Account number" />
        <Input placeholder="IFSC" />
        <Button variant="outline">Update</Button>
      </Card>
    </div>
  )
}
