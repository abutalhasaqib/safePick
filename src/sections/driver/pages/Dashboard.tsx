import { Card, Button } from '../../../ui/primitives'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Shield, CheckCircle } from 'lucide-react'
import { useKYC } from '../../../shared/kyc'

export default function Dashboard(){
  const navigate = useNavigate()
  const { kycData } = useKYC()

  const canGoOnline = kycData.canGoOnline

  return (
    <div className="space-y-6">
      {/* KYC Status Alert */}
      {!canGoOnline && (
        <Card className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Complete KYC Verification to Go Online
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                You need to complete your KYC verification before you can accept ride requests. 
                Progress: {kycData.completedSteps}/{kycData.totalSteps} steps completed.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/driver/kyc')}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Shield size={16} />
                  Complete KYC Verification
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/driver/kyc')}
                  className="border-amber-600 text-amber-700 hover:bg-amber-50"
                >
                  View Progress
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Main Dashboard Card */}
      <Card className="p-6 bg-gradient-to-r from-skyBlue to-secondary text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Driver Dashboard</h1>
            <p className="text-sm text-white/90">
              {canGoOnline ? 'Go Online to receive requests' : 'Complete KYC to start earning'}
            </p>
          </div>
          
          {canGoOnline ? (
            <Button className="bg-white text-slate-900 hover:bg-accent">
              Go Online
            </Button>
          ) : (
            <Button 
              disabled 
              className="bg-white/20 text-white/50 cursor-not-allowed"
              title="Complete KYC verification first"
            >
              KYC Required
            </Button>
          )}
        </div>
        
        {canGoOnline && (
          <div className="mt-4 flex items-center gap-2 text-white/90">
            <CheckCircle size={16} />
            <span className="text-sm">Profile Verified</span>
          </div>
        )}
      </Card>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">New Requests</Card>
        <Card className="p-6">Today’s Trips</Card>
        <Card className="p-6">Earnings Snapshot</Card>
      </div>
    </div>
  )
}
