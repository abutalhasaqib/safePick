import { useState } from 'react'
import { Card, Button, Input, Badge } from '../../../ui/primitives'
import PageHeader from '../../../ui/PageHeader'
import { useNavigate } from 'react-router-dom'
import { useKYC } from '../../../shared/kyc'
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  User,
  Car,
  Shield,
  FileText,
  Phone
} from 'lucide-react'

export default function KYCVerification() {
  const navigate = useNavigate()
  const { kycData } = useKYC()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-success" />
      case 'in_progress':
        return <Clock size={20} className="text-primary" />
      case 'rejected':
        return <AlertCircle size={20} className="text-danger" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge color="verified" className="text-xs">Verified</Badge>
      case 'in_progress':
        return <Badge color="warning" className="text-xs">In Progress</Badge>
      case 'rejected':
        return <Badge color="warning" className="text-xs bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="text-xs">Pending</Badge>
    }
  }

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'personal': return User
      case 'documents': return FileText
      case 'vehicle': return Car
      case 'background': return Shield
      case 'phone': return Phone
      case 'review': return CheckCircle
      default: return FileText
    }
  }

  const progressPercentage = (kycData.completedSteps / kycData.totalSteps) * 100

  return (
    <div className="space-y-6">
      <PageHeader title="KYC Verification" />
      
      {/* Progress Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Verification Progress</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {kycData.completedSteps} of {kycData.totalSteps} steps completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
            <div className="text-xs text-slate-500">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Warning Message */}
        {!kycData.isCompleted && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-200">Verification Required</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  You must complete all verification steps before you can go online and receive ride requests.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Verification Steps */}
      <div className="grid gap-4">
        {kycData.steps.map((step, index) => {
          const Icon = getStepIcon(step.id)
          
          return (
            <Card 
              key={step.id} 
              className="p-5 cursor-pointer transition-all hover:shadow-md"
              onClick={() => navigate(`/driver/kyc/${step.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      {index + 1}. {step.title}
                    </h3>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {step.status === 'pending' && (
                    <Button 
                      variant="outline"
                      className="text-sm px-3 py-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/driver/kyc/${step.id}`)
                      }}
                    >
                      Start
                    </Button>
                  )}
                  {step.status === 'in_progress' && (
                    <Button 
                      className="text-sm px-3 py-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/driver/kyc/${step.id}`)
                      }}
                    >
                      Continue
                    </Button>
                  )}
                  {step.status === 'completed' && (
                    <Button 
                      variant="outline"
                      className="text-sm px-3 py-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/driver/kyc/${step.id}`)
                      }}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate('/driver')}
          className="flex-1"
        >
          Back to Dashboard
        </Button>
        {progressPercentage === 100 && (
          <Button 
            onClick={() => navigate('/driver')}
            className="flex-1"
          >
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  )
}
