import { useState } from 'react'
import { Card, Button, Input } from '../../../ui/primitives'
import PageHeader from '../../../ui/PageHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, Camera, CheckCircle, X, FileText, CreditCard, Car as CarIcon } from 'lucide-react'

type DocumentType = 'aadhaar' | 'pan' | 'license' | 'rc' | 'insurance' | 'fitness' | 'police'

interface Document {
  type: DocumentType
  title: string
  description: string
  required: boolean
  uploaded: boolean
  verified: boolean
  file?: File
}

const DOCUMENT_TYPES: Record<string, Document[]> = {
  documents: [
    {
      type: 'aadhaar',
      title: 'Aadhaar Card',
      description: 'Government issued identity proof',
      required: true,
      uploaded: false,
      verified: false
    },
    {
      type: 'pan',
      title: 'PAN Card',
      description: 'Permanent Account Number card',
      required: true,
      uploaded: false,
      verified: false
    },
    {
      type: 'license',
      title: 'Driving License',
      description: 'Valid driving license for commercial vehicle',
      required: true,
      uploaded: false,
      verified: false
    }
  ],
  vehicle: [
    {
      type: 'rc',
      title: 'Vehicle RC',
      description: 'Registration Certificate of your vehicle',
      required: true,
      uploaded: false,
      verified: false
    },
    {
      type: 'insurance',
      title: 'Vehicle Insurance',
      description: 'Valid insurance certificate',
      required: true,
      uploaded: false,
      verified: false
    },
    {
      type: 'fitness',
      title: 'Fitness Certificate',
      description: 'Vehicle fitness certificate for commercial use',
      required: true,
      uploaded: false,
      verified: false
    }
  ],
  background: [
    {
      type: 'police',
      title: 'Police Verification',
      description: 'Police character certificate',
      required: true,
      uploaded: false,
      verified: false
    }
  ]
}

const STEP_TITLES: Record<string, string> = {
  documents: 'Identity Documents',
  vehicle: 'Vehicle Registration',
  background: 'Background Check',
  personal: 'Personal Information',
  phone: 'Phone Verification',
  review: 'Final Review'
}

export default function KYCStep() {
  const navigate = useNavigate()
  const { step } = useParams<{ step: string }>()
  const [documents, setDocuments] = useState<Document[]>(DOCUMENT_TYPES[step || 'documents'] || [])
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    fatherName: '',
    dateOfBirth: '',
    address: '',
    pincode: '',
    emergencyContact: ''
  })

  const handleFileUpload = (docType: DocumentType, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.type === docType 
        ? { ...doc, uploaded: true, file } 
        : doc
    ))
  }

  const removeFile = (docType: DocumentType) => {
    setDocuments(prev => prev.map(doc => 
      doc.type === docType 
        ? { ...doc, uploaded: false, file: undefined } 
        : doc
    ))
  }

  const getStepContent = () => {
    switch (step) {
      case 'personal':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Full Name" 
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo(prev => ({...prev, fullName: e.target.value}))}
                />
                <Input 
                  placeholder="Father's Name" 
                  value={personalInfo.fatherName}
                  onChange={(e) => setPersonalInfo(prev => ({...prev, fatherName: e.target.value}))}
                />
                <Input 
                  type="date" 
                  placeholder="Date of Birth" 
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => setPersonalInfo(prev => ({...prev, dateOfBirth: e.target.value}))}
                />
                <Input 
                  placeholder="Emergency Contact" 
                  value={personalInfo.emergencyContact}
                  onChange={(e) => setPersonalInfo(prev => ({...prev, emergencyContact: e.target.value}))}
                />
                <Input 
                  placeholder="Complete Address" 
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo(prev => ({...prev, address: e.target.value}))}
                  className="md:col-span-2"
                />
                <Input 
                  placeholder="Pincode" 
                  value={personalInfo.pincode}
                  onChange={(e) => setPersonalInfo(prev => ({...prev, pincode: e.target.value}))}
                />
              </div>
            </Card>
          </div>
        )
      
      case 'phone':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Phone Verification</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    We'll send an OTP to your registered mobile number for verification.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Enter 6-digit OTP" className="flex-1" />
                  <Button variant="outline">Verify OTP</Button>
                </div>
                <Button variant="outline" className="w-full">Resend OTP</Button>
              </div>
            </Card>
          </div>
        )
      
      case 'review':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Final Review</h3>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Your application is under review by our verification team. This process typically takes 24-48 hours. 
                  You'll receive a notification once your profile is approved.
                </p>
              </div>
            </Card>
          </div>
        )
      
      default:
        return (
          <div className="space-y-6">
            {documents.map((doc) => (
              <Card key={doc.type} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText size={20} />
                      {doc.title}
                      {doc.required && <span className="text-red-500">*</span>}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {doc.description}
                    </p>
                  </div>
                  {doc.verified && (
                    <CheckCircle size={20} className="text-success" />
                  )}
                </div>

                {!doc.uploaded ? (
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center">
                    <Upload size={32} className="mx-auto text-slate-400 mb-4" />
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      Upload a clear photo of your {doc.title}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) handleFileUpload(doc.type, file)
                          }
                          input.click()
                        }}
                      >
                        <Upload size={16} />
                        Choose File
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {/* Camera functionality */}}
                      >
                        <Camera size={16} />
                        Camera
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-300 dark:border-slate-600 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-success" />
                        <span className="text-sm font-medium">
                          {doc.file?.name || `${doc.title} uploaded`}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => removeFile(doc.type)}
                        className="p-2"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )
    }
  }

  const canProceed = () => {
    switch (step) {
      case 'personal':
        return Object.values(personalInfo).every(value => value.trim() !== '')
      case 'documents':
      case 'vehicle':
      case 'background':
        return documents.filter(doc => doc.required).every(doc => doc.uploaded)
      default:
        return true
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title={STEP_TITLES[step || 'documents']} />
      
      {getStepContent()}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate('/driver/kyc')}
          className="flex-1"
        >
          Back to Overview
        </Button>
        <Button 
          onClick={() => {
            // Save progress and navigate back
            navigate('/driver/kyc')
          }}
          disabled={!canProceed()}
          className="flex-1"
        >
          {step === 'review' ? 'Submit for Review' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  )
}
