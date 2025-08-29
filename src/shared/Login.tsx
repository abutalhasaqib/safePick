import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input } from '../ui/primitives'
import { useRole } from './role'
import { useLogin, useRegister } from '../hooks/useAuth'
import { toast } from 'sonner'

export default function Login() {
  const { setRole } = useRole()
  const [selectedRole, setSelectedRole] = useState<'parent' | 'driver'>('parent')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const registerMutation = useRegister()

  // Comment out mobile/OTP related state for future use
  // const [step, setStep] = useState<'phone' | 'otp'>('phone')
  // const [phone, setPhone] = useState('')
  // const [otp, setOtp] = useState('')
  // const [country] = useState('India (+91)')

  // Comment out mobile/OTP handlers for future use
  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/[^0-9]/g, '') // Only allow numbers
  //   if (value.length <= 10) {
  //     setPhone(value)
  //   }
  // }

  // const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/[^0-9]/g, '') // Only allow numbers
  //   if (value.length <= 6) {
  //     setOtp(value)
  //   }
  // }

  // const handleSendOtp = () => {
  //   if (phone.length === 10) {
  //     setStep('otp')
  //   }
  // }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    try {
      const result = await loginMutation.mutateAsync({ email, password })
      // Set role based on user data from API response or selected role
      setRole(result.user.role || selectedRole)
      toast.success('Login successful!')
      // Navigate based on the user's role
      const userRole = result.user.role || selectedRole
      navigate(userRole === 'parent' ? '/parent' : '/driver', { replace: true })
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    }
  }

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      toast.error('Please fill in all required fields')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    try {
      await registerMutation.mutateAsync({
        email,
        password,
        role: selectedRole,
        full_name: fullName,
      })
      // Set the role and navigate directly to the app
      setRole(selectedRole)
      toast.success('Account created successfully!')
      navigate(selectedRole === 'parent' ? '/parent' : '/driver', { replace: true })
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
    }
  }

  // Comment out mobile/OTP related handlers for future use
  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/[^0-9]/g, '') // Only allow numbers
  //   if (value.length <= 10) {
  //     setPhone(value)
  //   }
  // }

  // const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/[^0-9]/g, '') // Only allow numbers
  //   if (value.length <= 6) {
  //     setOtp(value)
  //   }
  // }

  // const handleSendOtp = () => {
  //   if (phone.length === 10) {
  //     setStep('otp')
  //   }
  // }

  // const handleVerify = () => {
  //   if (otp.length >= 4) {
  //     setRole(selectedRole)
  //     navigate(selectedRole === 'parent' ? '/parent' : '/driver', { replace: true })
  //   }
  // }

  const isLoginFormValid = email.length > 0 && password.length > 0
  const isRegisterFormValid = email.length > 0 && password.length > 0 && fullName.length > 0
  // const isPhoneValid = phone.length === 10
  // const isOtpValid = otp.length >= 4

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="SafePick" className="w-9 h-9" />
          <h1 className="text-xl font-heading font-semibold">SafePick</h1>
        </div>
      </header>
      <main className="flex-1 flex items-start sm:items-center justify-center p-4">
        <Card className="w-full max-w-md p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {mode === 'login' ? 'Sign In' : 'Join SafePick'}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {mode === 'login' 
              ? 'Welcome back! Sign in to your account.' 
              : 'Create your account for secure child transportation'
            }
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="role" className="block text-sm font-medium">Role</label>
              <select
                id="role"
                aria-label="Select role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'parent' | 'driver')}
                className="mt-1 w-full h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="parent">Parent</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                aria-describedby="email-help"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a password (min 6 characters)'}
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <Button 
              className="mt-3 w-full" 
              onClick={mode === 'login' ? handleLogin : handleRegister} 
              disabled={
                mode === 'login' 
                  ? (!isLoginFormValid || loginMutation.isPending)
                  : (!isRegisterFormValid || registerMutation.isPending)
              }
            >
              {mode === 'login' 
                ? (loginMutation.isPending ? 'Signing in...' : 'Sign In')
                : (registerMutation.isPending ? 'Creating Account...' : 'Create Account & Continue')
              }
            </Button>

            {/* Commented out mobile/OTP section for future use */}
            {/* 
            <div>
              <label htmlFor="country" className="block text-sm font-medium">Country</label>
              <select
                id="country"
                aria-label="Select country"
                value={country}
                disabled
                className="mt-1 w-full h-11 rounded-xl border bg-background px-3 text-sm opacity-50 cursor-not-allowed"
              >
                <option value="India (+91)">India (+91)</option>
              </select>
            </div>

            {step === 'phone' && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone number</label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  aria-describedby="phone-help"
                  maxLength={10}
                />
                <p id="phone-help" className="mt-1 text-xs text-slate-500">
                  We'll send an OTP to verify. {phone.length > 0 && `${phone.length}/10`}
                </p>
                <Button 
                  className="mt-3 w-full" 
                  onClick={handleSendOtp} 
                  disabled={!isPhoneValid}
                >
                  Send OTP
                </Button>
              </div>
            )}

            {step === 'otp' && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium">Enter OTP</label>
                <Input
                  id="otp"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="6-digit code"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                />
                <p className="mt-1 text-xs text-slate-500">
                  OTP sent to +91 {phone.slice(0, 2)}****{phone.slice(-2)}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => { setStep('phone'); setOtp('') }}>Back</Button>
                  <Button onClick={handleVerify} disabled={!isOtpValid}>Verify</Button>
                </div>
                <button 
                  className="mt-3 text-sm underline hover:no-underline" 
                  aria-label="Resend OTP"
                  onClick={() => setOtp('')}
                >
                  Resend OTP
                </button>
              </div>
            )}
            */}
          </div>
          
          {/* Mode Toggle Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">
                  {mode === 'login' ? 'New to SafePick?' : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  // Clear form when switching modes
                  setPassword('')
                  setFullName('')
                }}
              >
                {mode === 'login' ? 'Create Account' : 'Sign In Instead'}
              </Button>
            </div>
          </div>
          
          <p className="mt-4 text-xs text-slate-500">
            By continuing you accept the Terms & Privacy Policy.
          </p>
        </Card>
      </main>
      <footer className="p-4 text-center text-xs text-slate-600 dark:text-slate-300">
        © {new Date().getFullYear()} SafePick
      </footer>
    </div>
  )
}
