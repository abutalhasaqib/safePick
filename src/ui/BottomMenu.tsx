import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Search, CreditCard, Settings as Cog, Inbox, Wallet, Shield } from 'lucide-react'
import { useRole } from '../shared/role'
import { cn } from './primitives'

export default function BottomMenu() {
  const [open, setOpen] = useState(false)
  const { role } = useRole()
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  const parentItems = [
    { to: '/parent', label: 'Dashboard', icon: Home },
    { to: '/parent/discovery', label: 'Find Drivers', icon: Search },
    { to: '/parent/payments', label: 'Payments', icon: CreditCard },
    { to: '/parent/settings', label: 'Settings', icon: Cog },
  ]
  const driverItems = [
    { to: '/driver', label: 'Dashboard', icon: Home },
    { to: '/driver/kyc', label: 'KYC Verify', icon: Shield },
    { to: '/driver/requests', label: 'Requests', icon: Inbox },
    { to: '/driver/earnings', label: 'Earnings', icon: Wallet },
  ]
  const items = role === 'parent' ? parentItems : role === 'driver' ? driverItems : []

  // Hide menu on auth screens or for guests
  const isAuthScreen = pathname === '/' || pathname.startsWith('/login')
  if (role === 'guest' || isAuthScreen || items.length === 0) return null

  return (
    <div className="lg:hidden">
      {open && (
        <button aria-label="Close menu overlay" onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40" />
      )}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(v => !v)}
            className={cn(
              "relative rounded-full shadow-lg bg-gradient-to-r from-primary to-golden text-slate-900 h-16 w-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl",
              open && "rotate-180 scale-110"
            )}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div className={cn(
        'fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ease-out',
        open ? 'translate-y-0' : 'translate-y-full'
      )}>
        <div className="mx-4 mb-4 rounded-2xl bg-card shadow-soft border backdrop-blur-md bg-white/95 dark:bg-slate-900/95">
          <nav className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {items.map(({ to, label, icon: Icon }) => {
                const active = pathname === to || pathname.startsWith(to + '/')
                return (
                  <Link key={to} to={to} className={cn(
                    'flex flex-col items-center gap-3 p-4 rounded-2xl text-center transition-all duration-200',
                    active 
                      ? 'bg-primary/10 text-primary scale-105 shadow-sm' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-102'
                  )}>
                    <div className={cn(
                      'p-3 rounded-full transition-colors',
                      active 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    )}>
                      <Icon size={22} />
                    </div>
                    <span className={cn(
                      'text-sm font-medium',
                      active ? 'text-primary' : 'text-slate-700 dark:text-slate-300'
                    )}>
                      {label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </nav>
          <div className="h-[env(safe-area-inset-bottom,0)]" />
        </div>
      </div>
    </div>
  )
}
