import { Card, Input, Button } from '../../../ui/primitives'
import PageHeader from '../../../ui/PageHeader'

export default function Settings(){
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" />
      
      <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">Profile</h2>
        <Input placeholder="Parent name" />
        <Input placeholder="Phone" />
        <Button>Save</Button>
      </Card>
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">Children</h2>
        <Input placeholder="Add child" />
        <Button variant="outline">Add</Button>
      </Card>
      </div>
    </div>
  )
}
