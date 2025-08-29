import { Bell, MapPin, User, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import RoleBadge from './RoleBadge'
import { useRole } from '../shared/role'

export default function Navbar() {
  const { role, logout } = useRole()
  const { pathname } = useLocation()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  // Treat "/" (index) or explicit "/login" as the auth screen
  const isAuthScreen = pathname === '/' || pathname.startsWith('/login')
  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link to={role === 'parent' ? '/parent' : role === 'driver' ? '/driver' : '/'} className="flex items-center gap-2 flex-shrink-0">
            <img src="/assets/logo.svg" alt="SafePick" className="w-8 h-8"/>
            <span className="font-heading font-semibold text-lg">SafePick</span>
          </Link>
          {!isAuthScreen && <RoleBadge />}
          {!isAuthScreen && (
            <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={16} />
              <span>Mumbai</span>
            </div>
          )}
        </div>
        {!isAuthScreen && (
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="p-2 rounded-xl hover:bg-pastelYellow transition-colors">
              <Bell size={18} />
            </button>
            <ThemeToggle />
            {role === 'guest' ? (
              <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                <User size={16} />
                <span className="text-sm">Login</span>
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-pastelYellow transition-colors"
                >
                  <User size={16} />
                  <span className="text-sm">{role === 'parent' ? 'Parent' : 'Driver'}</span>
                  <ChevronDown size={14} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>
                {showProfileMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-soft border z-20">
                      <div className="p-3 border-b">
                        <p className="text-sm font-medium">Welcome!</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{role === 'parent' ? 'Parent Account' : 'Driver Account'}</p>
                      </div>
                      <div className="p-1">
                        <Link 
                          to={role === 'parent' ? '/parent' : '/driver'}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <User size={16} />
                          Dashboard
                        </Link>
                        <Link 
                          to={role === 'parent' ? '/parent/settings' : '/driver/settings'}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Settings
                        </Link>
                        <hr className="my-1" />
                        <button 
                          onClick={() => { logout(); setShowProfileMenu(false) }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
