import { Card, Button, Input } from '../../../ui/primitives'
import { useState } from 'react'
import PageHeader from '../../../ui/PageHeader'

export default function HireFlow() {
  const [step, setStep] = useState(1)
  
  return (
    <div className="space-y-6">
      <PageHeader title="Hire Driver" />
      
      <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <Card className="p-6">
          <h2 className="font-semibold mb-2">Step {step} of 5</h2>
          {step === 1 && (
            <div className="space-y-3">
              <Input placeholder="Plan start date" />
              <Input placeholder="End date" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              <Input placeholder="Select child" />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              <Input placeholder="Pickup" />
              <Input placeholder="Drop" />
              <Input placeholder="Days & timings" />
            </div>
          )}
          {step === 4 && (
            <div className="space-y-3">
              <p>Terms & conditions…</p>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-3">
              <p>Payment method</p>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={()=>setStep(s=>Math.max(1,s-1))}>Back</Button>
            <Button onClick={()=>setStep(s=>Math.min(5,s+1))}>{step<5?'Next':'Pay'}</Button>
          </div>
        </Card>
      </div>
      <aside>
        <Card className="p-6">
          <h3 className="font-semibold">Price Summary</h3>
          <ul className="mt-2 text-sm space-y-1">
            <li className="flex justify-between"><span>Base fee</span><span>₹3,000</span></li>
            <li className="flex justify-between"><span>Distance</span><span>₹400</span></li>
            <li className="flex justify-between"><span>Stops</span><span>₹200</span></li>
            <li className="flex justify-between font-medium"><span>Total</span><span>₹3,600</span></li>
          </ul>
        </Card>
      </aside>
      </div>
    </div>
  )
}
