import { Card } from '../../../ui/primitives'

export default function Notifications(){
  return (
    <Card className="p-6">
      <h2 className="font-semibold mb-2">Notifications</h2>
      <ul className="text-sm space-y-2">
        <li>Payment received for September.</li>
        <li>We detected a route deviation. Tap to view.</li>
        <li>Police-verified & KYC-approved driver.</li>
      </ul>
    </Card>
  )
}
