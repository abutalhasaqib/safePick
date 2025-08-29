import { Card, Input, Button } from '../../../ui/primitives'

export default function Onboarding(){
  return (
    <div className="space-y-4">
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">KYC Onboarding</h2>
        <Input placeholder="Aadhaar" />
        <Input placeholder="License" />
        <Input placeholder="Bank account" />
        <Button>Submit</Button>
      </Card>
    </div>
  )
}
