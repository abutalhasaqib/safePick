import { Outlet, RouteObject, createBrowserRouter, createRoutesFromElements, Link, NavLink, Route, useRoutes } from 'react-router-dom'
import ParentDashboard from './pages/Dashboard'
import Discovery from './pages/Discovery'
import DriverProfile from './pages/DriverProfile'
import HireFlow from './pages/HireFlow'
import Payments from './pages/Payments'
import LiveTracking from './pages/LiveTracking'
import Subscriptions from './pages/Subscriptions'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Auth from './pages/Auth'

function Shell() { return <Outlet /> }

export default function ParentRoutes() {
  const element = useRoutes([
    { index: true, element: <ParentDashboard /> },
    { path: 'auth', element: <Auth /> },
    { path: 'discovery', element: <Discovery /> },
    { path: 'driver/:id', element: <DriverProfile /> },
    { path: 'hire/:id', element: <HireFlow /> },
    { path: 'payments', element: <Payments /> },
    { path: 'live', element: <LiveTracking /> },
    { path: 'subscriptions', element: <Subscriptions /> },
    { path: 'notifications', element: <Notifications /> },
    { path: 'settings', element: <Settings /> },
  ])
  return element
}
