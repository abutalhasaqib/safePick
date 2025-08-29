import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type KYCStepStatus = 'pending' | 'in_progress' | 'completed' | 'rejected'

export interface KYCStep {
  id: string
  name: string
  title: string
  description: string
  status: KYCStepStatus
  required: boolean
}

export interface KYCData {
  steps: KYCStep[]
  isCompleted: boolean
  completedSteps: number
  totalSteps: number
  canGoOnline: boolean
}

interface KYCContextType {
  kycData: KYCData
  updateStepStatus: (stepId: string, status: KYCStepStatus) => void
  refreshKYCStatus: () => void
}

const KYCContext = createContext<KYCContextType | undefined>(undefined)

const DEFAULT_KYC_STEPS: KYCStep[] = [
  { 
    id: 'personal', 
    name: 'Personal Information', 
    title: 'Personal Information',
    description: 'Basic details and profile setup',
    status: 'completed', 
    required: true 
  },
  { 
    id: 'documents', 
    name: 'Identity Documents', 
    title: 'Identity Documents',
    description: 'Aadhaar, PAN, Driving License',
    status: 'in_progress', 
    required: true 
  },
  { 
    id: 'vehicle', 
    name: 'Vehicle Registration', 
    title: 'Vehicle Registration',
    description: 'RC, Insurance, Fitness Certificate',
    status: 'pending', 
    required: true 
  },
  { 
    id: 'background', 
    name: 'Background Check', 
    title: 'Background Check',
    description: 'Police verification certificate',
    status: 'pending', 
    required: true 
  },
  { 
    id: 'phone', 
    name: 'Phone Verification', 
    title: 'Phone Verification',
    description: 'OTP verification for your number',
    status: 'pending', 
    required: true 
  },
  { 
    id: 'review', 
    name: 'Final Review', 
    title: 'Final Review',
    description: 'Admin review and approval',
    status: 'pending', 
    required: true 
  },
]

export function KYCProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<KYCStep[]>(DEFAULT_KYC_STEPS)

  const kycData: KYCData = {
    steps,
    completedSteps: steps.filter(step => step.status === 'completed').length,
    totalSteps: steps.length,
    isCompleted: steps.every(step => !step.required || step.status === 'completed'),
    canGoOnline: steps.every(step => !step.required || step.status === 'completed'),
  }

  const updateStepStatus = (stepId: string, status: KYCStepStatus) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ))
  }

  const refreshKYCStatus = () => {
    // In a real app, this would fetch from API
    console.log('Refreshing KYC status...')
  }

  useEffect(() => {
    // Load KYC status from localStorage or API
    const savedSteps = localStorage.getItem('kyc-steps')
    if (savedSteps) {
      try {
        setSteps(JSON.parse(savedSteps))
      } catch (e) {
        console.error('Failed to parse KYC steps from localStorage')
      }
    }
  }, [])

  useEffect(() => {
    // Save KYC status to localStorage
    localStorage.setItem('kyc-steps', JSON.stringify(steps))
  }, [steps])

  return (
    <KYCContext.Provider value={{ kycData, updateStepStatus, refreshKYCStatus }}>
      {children}
    </KYCContext.Provider>
  )
}

export function useKYC() {
  const context = useContext(KYCContext)
  if (context === undefined) {
    throw new Error('useKYC must be used within a KYCProvider')
  }
  return context
}
