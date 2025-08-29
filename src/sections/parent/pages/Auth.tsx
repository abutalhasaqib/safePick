import { Card, Input, Button } from '../../../ui/primitives'
import { useState } from 'react'

export default function Auth(){
  const [step, setStep] = useState<'phone'|'otp'>('phone')
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 space-y-3">
        <h1 className="text-xl font-semibold">Sign In</h1>
        {step==='phone' && (
          <>
            <Input placeholder="Phone number" />
            <Button onClick={()=>setStep('otp')}>Send OTP</Button>
          </>
        )}
        {step==='otp' && (
          <>
            <Input placeholder="Enter OTP" />
            <Button>Verify</Button>
          </>
        )}
      </Card>
    </div>
  )
}
