import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from './shared/AppLayout'
import Home from './shared/Home'
import NotFound from './shared/NotFound'
import StyleGuide from './shared/StyleGuide'
import Login from './shared/Login'
import ParentRoutes from './sections/parent/ParentRoutes'
import DriverRoutes from './sections/driver/DriverRoutes'
import { useRole } from './shared/role'

function RoleGate({ forRole, children }: { forRole: 'parent'|'driver', children: JSX.Element }) {
  const { role } = useRole()
  if (role === 'guest') return <Navigate to="/" replace />
  if (role !== forRole) return <Navigate to={role === 'parent' ? '/parent' : '/driver'} replace />
  return children
}

export const router = createBrowserRouter([
  // Main app with layout
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
  { index: true, element: <Login /> },
  { path: 'home', element: <Home /> },
  { path: 'style', element: <StyleGuide /> },
  { path: 'parent/*', element: <RoleGate forRole="parent"><ParentRoutes /></RoleGate> },
  { path: 'driver/*', element: <RoleGate forRole="driver"><DriverRoutes /></RoleGate> },
    ],
  },
])
