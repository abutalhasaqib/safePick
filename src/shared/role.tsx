import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Role = 'parent' | 'driver' | 'guest'

type RoleContextValue = {
  role: Role
  setRole: (r: Role) => void
  logout: () => void
  isLoading: boolean
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('guest')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('safepick_role') as Role | null
    if (saved) setRoleState(saved)
    setIsLoading(false)
  }, [])

  const setRole = (r: Role) => {
    setRoleState(r)
    if (r === 'guest') localStorage.removeItem('safepick_role')
    else localStorage.setItem('safepick_role', r)
  }

  const logout = () => setRole('guest')

  const value = useMemo(() => ({ role, setRole, logout, isLoading }), [role, isLoading])
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
