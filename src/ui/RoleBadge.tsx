import { useLocation } from 'react-router-dom'

export default function RoleBadge() {
  const { pathname } = useLocation()
  const role = pathname.startsWith('/driver') ? 'Driver' : pathname.startsWith('/parent') ? 'Parent' : 'Guest'
  const color = role === 'Driver' ? 'bg-secondary text-white' : role === 'Parent' ? 'bg-primary text-slate-900' : 'bg-accent text-slate-900'
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${color}`}>{role}</span>
  )
}
