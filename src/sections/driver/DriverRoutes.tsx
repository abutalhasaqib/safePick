import { useRoutes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import RouteSetup from './pages/RouteSetup'
import Requests from './pages/Requests'
import RideConsole from './pages/RideConsole'
import Earnings from './pages/Earnings'
import Ratings from './pages/Ratings'
import Settings from './pages/Settings'
import KYCVerification from './pages/KYCVerification'
import KYCStep from './pages/KYCStep'

export default function DriverRoutes() {
  const element = useRoutes([
    { index: true, element: <Dashboard /> },
    { path: 'onboarding', element: <Onboarding /> },
    { path: 'kyc', element: <KYCVerification /> },
    { path: 'kyc/:step', element: <KYCStep /> },
    { path: 'route', element: <RouteSetup /> },
    { path: 'requests', element: <Requests /> },
    { path: 'ride', element: <RideConsole /> },
    { path: 'earnings', element: <Earnings /> },
    { path: 'ratings', element: <Ratings /> },
    { path: 'settings', element: <Settings /> },
  ])
  return element
}
