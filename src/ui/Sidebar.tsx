import { Link, useLocation } from 'react-router-dom'
import { useRole } from '../shared/role'

const parentItems = [
  { to: '/parent', label: 'Dashboard' },
  { to: '/parent/discovery', label: 'Find Drivers' },
  { to: '/parent/subscriptions', label: 'Subscriptions' },
  { to: '/parent/payments', label: 'Payments' },
  { to: '/parent/notifications', label: 'Notifications' },
  { to: '/parent/settings', label: 'Settings' },
]

const driverItems = [
  { to: '/driver', label: 'Dashboard' },
  { to: '/driver/route', label: 'Route & Schedule' },
  { to: '/driver/requests', label: 'Requests Inbox' },
  { to: '/driver/earnings', label: 'Earnings' },
  { to: '/driver/ratings', label: 'Ratings & Reviews' },
  { to: '/driver/settings', label: 'Settings' },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const { role } = useRole()
  const isParentView = pathname.startsWith('/parent')
  const items = (role === 'parent' ? parentItems : role === 'driver' ? driverItems : [])

  return (
    <nav className="rounded-2xl bg-card shadow-soft p-3">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + '/')
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-pastelYellow transition-colors ${active ? 'bg-primary text-slate-900 font-medium' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
        {items.length === 0 && (
          <li className="text-sm text-slate-600 dark:text-slate-300">
            Please <Link to="/" className="underline">sign in</Link> to view menu.
          </li>
        )}
      </ul>
    </nav>
  )
}
